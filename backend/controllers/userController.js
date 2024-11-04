// controllers/userController.js
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken'); // JWT 라이브러리
const pool = require("../db");
require('dotenv').config();

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //비밀번호 해싱
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, currentPassword, newPassword } = req.body;

    // 기존 사용자 정보 가져오기
    const userResult = await pool.query("SELECT password FROM users WHERE id = $1", [id]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).send("User not found");
    }

    // 이름 중복 확인
    const nameCheckResult = await pool.query("SELECT * FROM users WHERE username = $1 AND id != $2", [name, id]);
    if (nameCheckResult.rows.length > 0) {
      return res.status(400).send("중복된 이름이 존재합니다.");
    }

    // 비밀번호 변경이 필요한 경우
    if (newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password); // 기존 비밀번호 확인
      if (!isMatch) {
        return res.status(400).send("현재 비밀번호가 일치하지 않습니다.");
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds); // 새 비밀번호 해싱

      await pool.query(
        "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4",
        [name, email, hashedPassword, id]
      );
    } else {
      // 비밀번호 변경 없이 이름과 이메일만 업데이트
      await pool.query(
        "UPDATE users SET username = $1, email = $2 WHERE id = $3",
        [name, email, id]
      );
    }

    res.send("User updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.send("User deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


// 로그인 기능 (비밀번호 검증 및 토큰 생성)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 데이터베이스에서 사용자 검색
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    // 비밀번호 비교
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }

    // JWT 토큰 생성 (user ID를 기반으로 생성)
    try {
      const token = jwt.sign(
        { id: user.rows[0].id, email: user.rows[0].email }, // 토큰에 포함할 데이터
        process.env.JWT_SECRET, // 비밀키
        { expiresIn: '1h' } // 토큰 만료 시간
      );
      console.log("JWT token generated: ", token);
      // 로그인 성공 응답 (토큰 및 사용자 정보 포함)
      res.json({
        token: token, // 생성된 JWT 토큰
        name: user.rows[0].username, // 사용자 이름 반환 (username으로 수정)
        email: user.rows[0].email,
        id : user.rows[0].id
      });
    } catch (err) {
      console.error("JWT error: ", err.message);  // JWT 생성 문제 로그
      res.status(500).send("Error generating token");
    }
  } catch (err) {
    console.error("Database or bcrypt error: ", err.message);  // bcrypt 또는 DB 문제 로그
    res.status(500).send("Server error");
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
