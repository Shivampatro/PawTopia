const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST api/contact
// @desc    Submit a contact form
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide Name, Email, and Message' });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      phoneNumber,
      message
    });

    const contact = await newContact.save();
    res.status(201).json({
      message: 'Contact query submitted successfully',
      contact
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error during submission' });
  }
});

// @route   GET api/contact
// @desc    Get all contact submissions
// @access  Public (Normally this would be protected, but for development testing it is open)
router.get('/', async (req, res) => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 });
    res.json({
      count: submissions.length,
      submissions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error retrieving contact submissions' });
  }
});

module.exports = router;
