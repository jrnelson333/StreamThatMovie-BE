const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  release_date: { type: String, required: true },
  popularity: { type: Number, required: false },
  vote_average: { type: Number, required: false },
  vote_count: { type: Number, required: false },
  overview: { type: String, required: false },  
  poster_path: { type: String, required: true },
  genre_ids: { type: Array, required: false },
  backdrop_path: { type: String, required: false }
});

favoriteSchema.index({id: 1, userId: 1}, {unique: true});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
