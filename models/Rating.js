const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  userId: { type: String, required: true },
  rating: { type: Number, required: true }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
