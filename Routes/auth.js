import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../modules/user.js';
import dotenv from 'dotenv';
dotenv.config()

const router = express.Router();

// LOGIN ROUTE FOR ALL USER TYPES
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({ 
        message: 'Email, password, and role are required' 
      });
    }

    // Validate role
    if (!['club', 'startup', 'student'].includes(role)) {
      return res.status(400).json({ 
        message: 'Invalid role. Must be club, startup, or student' 
      });
    }

    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid credentials for the specified role' 
      });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Invalid credentials for the specified role' 
      });
    }

    // Generate JWT with role information
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Return response with token and user info
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// REGISTER ROUTE FOR ALL USER TYPES
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, profile } = req.body;

    // Validate required fields
    if (!email || !password || !role || !profile) {
      return res.status(400).json({ 
        message: 'Email, password, role, and profile are required' 
      });
    }

    // Validate role
    if (!['club', 'startup', 'student'].includes(role)) {
      return res.status(400).json({ 
        message: 'Invalid role. Must be club, startup, or student' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with role-specific profile
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      profile
    });

    // Save user
    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { 
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Return response
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        profile: newUser.profile
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

export default router;