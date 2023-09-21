const mongoose = require('mongoose');

const myPetsSchema = new mongoose.Schema({
  nombre: String,
  tipo: String,
  raza: String,
  cumpleanos: Date,
  genero: String,
  esterilizado: Boolean,
});

const myPets = mongoose.model('MyPets', myPetsSchema);

module.exports = myPets;
