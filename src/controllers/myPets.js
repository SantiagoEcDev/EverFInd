const express = require('express');
const router = express.Router();
const myPets = require('../models/myPets');

// Ruta para mostrar el formulario
router.get('/addPet', (req, res) => {
  res.render('formulario');
});

// Ruta para procesar el formulario y guardar la mascota
router.post('/addPet', (req, res) => {
  const newPet = new Pets({
    nombre: req.body.nombre,
    tipo: req.body.tipo,
    raza: req.body.raza,
    cumpleanos: req.body.cumpleanos,
    genero: req.body.genero,
    esterilizado: req.body.esterilizado === 'on',
  });

  newPet.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al guardar los datos en la base de datos.');
    });
});

module.exports = router;
