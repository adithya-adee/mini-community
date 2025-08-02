const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      bio,
      profilePicture,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const newUser = new User({
      name,
      email,
      password,
      bio: bio || '',
      profilePicture: profilePicture || '',
    });
    
    const savedUser = await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET || 'fallback_secret');
    
    res.status(201).json({ 
      token,
      user: savedUser
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user and include password field for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    // Use the model's comparePassword method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret');
    
    // Remove password from response
    const userResponse = user.toJSON();
    
    res.status(200).json({ token, user: userResponse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
