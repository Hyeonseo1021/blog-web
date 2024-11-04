// routes/commentRoutes.js

const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/comments", authMiddleware, commentsController.createComment);
router.get("/comments/:post_id", commentsController.getCommentsByPostId);
router.put("/comments/:id", authMiddleware, commentsController.updateComment);
router.delete("/comments/:id", authMiddleware, commentsController.deleteComment);

module.exports = router;
