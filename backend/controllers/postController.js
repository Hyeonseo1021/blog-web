// controllers/postController.js

const pool = require("../db");

const createPost = async (req, res) => {
  try {
    const { user_id, title, content, image } = req.body;
    const newPost = await pool.query(
      "INSERT INTO posts (user_id, title, content, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, title, content, image]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all posts (no change needed)
const getPosts = async (req, res) => {
  try {
    const allPosts = await pool.query("SELECT * FROM posts");
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a post by ID (no change needed)
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (post.rows.length === 0) {
      return res.status(404).send("Post not found");
    }
    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;

    if (image) {
      await pool.query(
        "UPDATE posts SET title = $1, content = $2, image = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4",
        [title, content, image, id]
      );
    } else {
      await pool.query(
        "UPDATE posts SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3",
        [title, content, id]
      );
    }

    res.send("Post updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.send("Post deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
