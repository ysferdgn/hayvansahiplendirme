// routes/auth.js
const router = require("express").Router();
const User   = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    console.log("Register request body:", req.body); // Gelen veriyi logla

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log("User already exists with email:", req.body.email);
      return res.status(400).json({ message: "Bu email adresi zaten kullanımda" });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    console.log("Password hashed successfully");

    const user = new User({
      username: req.body.name,
      email: req.body.email,
      password: hash
    });
    
    console.log("Attempting to save user:", { username: user.username, email: user.email });
    
    const savedUser = await user.save();
    console.log("User saved successfully:", savedUser._id);
    
    // Create token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    console.log("Token created successfully");

    // Return user data and token
    const response = {
      message: "Kayıt başarılı",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.username,
        email: savedUser.email
      }
    };
    console.log("Sending response:", response);
    
    res.status(201).json(response);
  } catch (err) {
    console.error("Register error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    console.log("Login attempt for email:", req.body.email);
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found with email:", req.body.email);
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      console.log("Invalid password for user:", req.body.email);
      return res.status(401).json({ message: "Şifre yanlış" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    const response = {
      message: "Giriş başarılı",
      token,
      user: {
        id: user._id,
        name: user.username,
        email: user.email
      }
    };
    console.log("Login successful for user:", user._id);
    
    res.json(response);
  } catch (err) {
    console.error("Login error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
