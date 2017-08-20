const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  movieId: { type: Number, required: true },
  userId: { type: String, required: true },
});

favoriteSchema.index({movieId: 1}, {unique: true});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
