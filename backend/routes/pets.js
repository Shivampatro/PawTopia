const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const { auth, admin } = require('../middleware/auth');

// Helper to format Mongoose validation errors
const handleMongooseError = (err, res, defaultMsg) => {
  console.error(err.message);
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ message: messages.join(', ') });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid pet ID format' });
  }
  res.status(500).json({ message: defaultMsg });
};

// @route   GET /api/pets
// @desc    Get all pets
// @access  Public
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    console.error('Error fetching pets:', err.message);
    res.status(500).json({ message: 'Server error retrieving pets' });
  }
});

// @route   POST /api/pets
// @desc    Add a new pet
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
  const { name, age, gender, category, image, description, price } = req.body || {};

  if (!name || !age || !gender || !category || !image) {
    return res.status(400).json({ message: 'Please provide all required fields (name, age, gender, category, image)' });
  }

  try {
    const newPet = new Pet({
      name,
      age,
      gender,
      category,
      image,
      description: description || 'A very friendly and lovable companion waiting for a home.',
      price: price || 'Free'
    });

    const pet = await newPet.save();
    res.status(201).json(pet);
  } catch (err) {
    handleMongooseError(err, res, 'Server error adding pet');
  }
});

// @route   PUT /api/pets/:id
// @desc    Update a pet
// @access  Private/Admin
router.put('/:id', [auth, admin], async (req, res) => {
  const { name, age, gender, category, image, description, price } = req.body || {};

  try {
    let pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (name) pet.name = name;
    if (age) pet.age = age;
    if (gender) pet.gender = gender;
    if (category) pet.category = category;
    if (image) pet.image = image;
    if (description !== undefined) pet.description = description;
    if (price !== undefined) pet.price = price;

    await pet.save();
    res.json(pet);
  } catch (err) {
    handleMongooseError(err, res, 'Server error updating pet');
  }
});

// @route   DELETE /api/pets/:id
// @desc    Delete a pet
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet removed successfully' });
  } catch (err) {
    handleMongooseError(err, res, 'Server error deleting pet');
  }
});

module.exports = router;
