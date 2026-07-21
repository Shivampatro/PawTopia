const express = require('express');
const router = express.Router();
const Accessory = require('../models/Accessory');
const { auth, admin } = require('../middleware/auth');

// Helper to format Mongoose error responses
const handleMongooseError = (err, res, defaultMsg) => {
  console.error(err.message);
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ message: messages.join(', ') });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid accessory ID format' });
  }
  res.status(500).json({ message: defaultMsg });
};

// @route   GET /api/accessories
// @desc    Get all accessories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const accessories = await Accessory.find().sort({ createdAt: -1 });
    res.json(accessories);
  } catch (err) {
    console.error('Error fetching accessories:', err.message);
    res.status(500).json({ message: 'Server error retrieving accessories' });
  }
});

// @route   POST /api/accessories
// @desc    Add a new accessory
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
  const { name, price, description, category, image } = req.body || {};

  if (!name || price === undefined || price === '' || !description || !category || !image) {
    return res.status(400).json({ message: 'Please provide all required fields (name, price, description, category, image)' });
  }

  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ message: 'Price must be a valid positive number' });
  }

  try {
    const newAccessory = new Accessory({
      name,
      price: numericPrice,
      description,
      category,
      image
    });

    const accessory = await newAccessory.save();
    res.status(201).json(accessory);
  } catch (err) {
    handleMongooseError(err, res, 'Server error adding accessory');
  }
});

// @route   PUT /api/accessories/:id
// @desc    Update an accessory
// @access  Private/Admin
router.put('/:id', [auth, admin], async (req, res) => {
  const { name, price, description, category, image } = req.body || {};

  try {
    let accessory = await Accessory.findById(req.params.id);
    if (!accessory) {
      return res.status(404).json({ message: 'Accessory not found' });
    }

    if (name) accessory.name = name;
    if (price !== undefined && price !== '') {
      const numericPrice = Number(price);
      if (isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({ message: 'Price must be a valid positive number' });
      }
      accessory.price = numericPrice;
    }
    if (description) accessory.description = description;
    if (category) accessory.category = category;
    if (image) accessory.image = image;

    await accessory.save();
    res.json(accessory);
  } catch (err) {
    handleMongooseError(err, res, 'Server error updating accessory');
  }
});

// @route   DELETE /api/accessories/:id
// @desc    Delete an accessory
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) {
      return res.status(404).json({ message: 'Accessory not found' });
    }

    await Accessory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Accessory removed successfully' });
  } catch (err) {
    handleMongooseError(err, res, 'Server error deleting accessory');
  }
});

module.exports = router;
