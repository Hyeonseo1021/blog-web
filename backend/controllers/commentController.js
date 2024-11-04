const pool = require("../db");
const jwt = require("jsonwebtoken");

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { post_id, content } = req.body;
    const user_id = req.user.id; // 미들웨어에서 설정한 user_id 사용

    const newComment = await pool.query(
      "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
      [post_id, user_id, content]
    );
    res.json(newComment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all comments for a post
const getCommentsByPostId = async (req, res) => {
  try {
    const { post_id } = req.params;
    const comments = await pool.query(
      "SELECT * FROM comments WHERE post_id = $1",
      [post_id]
    );
    res.json(comments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;

    // 댓글 작성자만 수정할 수 있게 체크
    const comment = await pool.query(
      "SELECT * FROM comments WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );
    if (comment.rows.length === 0) {
      return res.status(403).send("Unauthorized action");
    }

    await pool.query(
      "UPDATE comments SET content = $1 WHERE id = $2",
      [content, id]
    );
    res.send("Comment updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    // 댓글 작성자만 삭제할 수 있게 체크
    const comment = await pool.query(
      "SELECT * FROM comments WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );
    if (comment.rows.length === 0) {
      return res.status(403).send("Unauthorized action");
    }

    await pool.query("DELETE FROM comments WHERE id = $1", [id]);
    res.send("Comment deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};
