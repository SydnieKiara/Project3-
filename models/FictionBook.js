const mongoose = require('mongoose');

const FictionBookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('FictionBook', FictionBookSchema);
