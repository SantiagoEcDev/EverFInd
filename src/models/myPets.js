const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  type: String,
  breed: String,
  status: String,
  description: String,
  approved: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.String,
    ref: 'User'
  },
  imagePath: {
    type: String,
    required: false // lo pongo como opcional, puedes cambiar según tus necesidades
},
  createdAt:{
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Pet', petSchema);
