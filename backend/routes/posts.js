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

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/user/:userId", verifyToken, getUserPosts);

/* CREATE */
router.post("/", verifyToken, createPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* DELETE */
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
