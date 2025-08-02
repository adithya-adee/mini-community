const express = require("express");
const {
  getUser,
  getAllUsers,
  updateUser,
} = require("../controllers/users.js");
const { verifyToken } = require("../middlewares/auth.js");

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/:id", verifyToken, updateUser);

module.exports = router;
