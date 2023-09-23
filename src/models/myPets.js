const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  type: String,
  breed: String,
  lost: String,
  description: String,
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pet', petSchema);
