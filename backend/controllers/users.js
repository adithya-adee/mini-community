const User = require("../models/user.js");
const Post = require("../models/post.js");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, profilePicture } = req.body;
    
    // Check if user is updating their own profile
    if (req.user.id !== id) {
      return res.status(403).json({ message: "Not authorized to update this profile" });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, bio, profilePicture },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { 
  getUser, 
  getAllUsers, 
  updateUser 
};
