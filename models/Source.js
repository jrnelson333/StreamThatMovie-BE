const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  release_date: { type: String, required: true },
  popularity: { type: Number, required: false },
  vote_average: { type: Number, required: false },
  vote_count: { type: Number, required: false },
  overview: { type: String, required: false },  
  poster_path: { type: String, required: true },
  genre_ids: { type: Array, required: false },
  backdrop_path: { type: String, required: false },
  netflix: { type: Object, required: false },
  hulu: { type: Object, required: false },
  amazon: { type: Object, required: false }
});

const Source = mongoose.model('Source', sourceSchema);

module.exports = Source;
