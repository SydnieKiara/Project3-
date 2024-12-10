const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  membershipDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Member', MemberSchema);
