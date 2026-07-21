const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Rescue Dog', 'Breed Dog', 'Rescue Cat', 'Breed Cat'],
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: 'A very friendly and lovable companion waiting for a home.'
  },
  price: {
    type: String,
    default: 'Free'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', PetSchema);
