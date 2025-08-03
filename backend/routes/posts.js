const express = require("express");
const {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
} = require("../controllers/posts.js");
const { verifyToken } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/user/:userId", verifyToken, getUserPosts);

router.post("/", verifyToken, createPost);

router.patch("/:id/like", verifyToken, likePost);

router.delete("/:id", verifyToken, deletePost);

module.exports = router;
