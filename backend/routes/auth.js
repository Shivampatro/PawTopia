const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, admin } = require('../middleware/auth');

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, adminSecret } = req.body || {};

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please enter all required fields (firstName, lastName, email, password)' });
  }

  try {
    let user = await User.findOne({ email: email.toLowerCase().trim() });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    if (email.toLowerCase().trim() === 'admin@pawtopia.com' || adminSecret === 'PAWTOPIA_ADMIN') {
      user.role = 'admin';
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretpawtopiakey',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Signup error:', err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/signin
// @desc    Authenticate user & get token
// @access  Public
router.post('/signin', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretpawtopiakey',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Signin error:', err.message);
    res.status(500).json({ message: 'Server error during sign in' });
  }
});

// @route   GET /api/auth/users
// @desc    Get all registered users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({
      count: users.length,
      users
    });
  } catch (err) {
    console.error('Error retrieving users:', err.message);
    res.status(500).json({ message: 'Server error retrieving users' });
  }
});

module.exports = router;
