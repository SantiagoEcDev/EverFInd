const express = require('express');
const router = express.Router();
const pets = require('../models/myPets');

//New pet
  const pet = new pets({
    name:req.body.name,
    age:req.body.age,
    type:req.body.type,
    breed:req.body.breed,
    lost:req.body.lost,
    description:req.body.description,
    createdAt:req.body.createdAt
  })

  //Save pet in the database
  pet
    .save(pet)
    .then(data => {
      res.send(data)
    })
    .catch(err =>{
      res.status(500).send({
        message:err.message||"Some error ocurred while adding a pet"
      });
    });



module.exports = router;
