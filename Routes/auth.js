import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import student from '../modules/student.js';
import club from '../modules/club.js';
import startup from '../modules/startup.js';

dotenv.config();
const router = express.Router();

// Helper function to get the correct model by userType
const getModelByuserType = (userType) => {
  if (userType === 'student') return student;
  if (userType === 'club') return club;
  if (userType === 'startup') return startup;
  return null;
};

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ message: 'Email, password, and userType are required' });
    }

    const Model = getModelByuserType(userType);
    if (!Model) {
      return res.status(400).json({ message: 'Invalid userType' });
    }

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        userType,
        profile: user
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, password, userType, profile } = req.body;

    if (!email || !password || !userType || !profile) {
      return res.status(400).json({ message: 'Email, password, userType, and profile are required' });
    }

    const Model = getModelByuserType(userType);
    if (!Model) {
      return res.status(400).json({ message: 'Invalid userType' });
    }

    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Model({
      email,
      password: hashedPassword,
      ...profile  // Spread profile fields like name, college, etc.
    });

    await newUser.save();

    // const token = jwt.sign(
    //   {
    //     userId: newUser._id,
    //     email: newUser.email,
    //     userType
    //   },
    //   process.env.JWT_SECRET,
    //   { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    // );

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        userType,
        profile: newUser
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
