const mongoose = require('mongoose');

const NonFictionBookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('NonFictionBook', NonFictionBookSchema);
