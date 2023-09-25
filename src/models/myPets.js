const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  type: String,
  breed: String,
  status: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pet', petSchema);
