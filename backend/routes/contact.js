const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST /api/contact
// @desc    Submit a contact enquiry
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phoneNumber, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide Name, Email, and Message' });
  }

  try {
    const newContact = new Contact({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phoneNumber: phoneNumber ? phoneNumber.trim() : '',
      message: message.trim()
    });

    const contact = await newContact.save();
    res.status(201).json({
      message: 'Contact query submitted successfully',
      contact
    });
  } catch (err) {
    console.error('Error in contact submission:', err.message);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error during submission' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 });
    res.json({
      count: submissions.length,
      submissions
    });
  } catch (err) {
    console.error('Error retrieving contact submissions:', err.message);
    res.status(500).json({ message: 'Server error retrieving contact submissions' });
  }
});

module.exports = router;
