const express = require('express');
const router = express.Router();
const passport = require('passport');
const Pet = require('../models/myPets');
const path = require('path');

// Ruta para la página de inicio
router.get('/', (req, res, next) => {
    res.render('index');
});

// Ruta para la página de registro (signup)
router.get('/signup', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
    
});


router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    passReqToCallback: true
}));


router.get('/signin', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signin.html'));
    
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/home',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        // Redirect or respond as needed after logging out
        res.redirect('/'); // Example: Redirect to the home page
    });
});

// router.use((req, res, next) => {
//     isAuthenticated(req, res, next);
//     next();
//  });

router.get('/settings', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'settings.html'));
});

//Cargar los datos de las mascotas
router.get('/giveto', async (req, res, next) => {
    try {
        // Obtén la lista de mascotas desde la base de datos
        const pets = await Pet.find({owner: req.user.name});

        // Renderiza la vista 'giveto' y pasa la lista de mascotas como contexto
        res.render('giveto', { pets });
        
    } catch (error) {
        console.error('Error al obtener la lista de mascotas:', error);
        res.redirect('/'); // Redirige a la página de inicio o maneja el error de acuerdo a tus necesidades
    }
});


//Subir mascotas a la página
router.post('/addPet', async (req, res) => {
    const {name, age, type, breed, status, description, createdAt} = req.body;

    try{
        
        //Crea una nueva instancia de mascota con los datos del formulario
        const newPet = new Pet({
            name,
            age,
            type,
            breed,
            status,
            description,
            createdAt,
            owner: req.user.name,
        });

        await newPet.save();

        res.redirect('/giveto');
    }catch (error){
        console.error('Error al guardar la mascota:', error );
        res.redirect('/giveto');
    }
});

router.get('/home', async (req, res, next) => {
    try {
        // Obtén la lista de mascotas desde la base de datos o de donde sea necesario
        const pets = await Pet.find();

        // Renderiza la vista 'home' y pasa la lista de mascotas como contexto
        res.render('home', { pets });
    } catch (error) {
        console.error('Error al obtener la lista de mascotas:', error);
        res.redirect('/'); // Maneja el error de acuerdo a tus necesidades
    }
});

//Edit pets
router.get('/edit/:id', async (req, res) => {
    try {
        const petId = req.params.id;
        const pet = await Pet.findById(petId);
        // Renderiza una vista de formulario de edición y pasa los datos de la mascota
        res.render('editPet', { pet });
    } catch (error) {
        console.error('Error al cargar el formulario de edición:', error);
        res.redirect('/giveto');
    }
});

//Update pet form
router.post('/editPet/:id', async (req, res) => {
    try {
      const { name, age, type, breed, description } = req.body;
      const pet = await Pet.findByIdAndUpdate(req.params.id, {
        name,
        age,
        type,
        breed,
        lost,
        description,
      });
      if (!pet) {
        // Maneja el caso en que no se encuentre la mascota
        return res.status(404).send('Mascota no encontrada');
      }
      res.redirect('/giveto');
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
      res.redirect('/giveto');
    }
  });   
//End update pets

//End edit pets

//Delete pets
router.get('/delete/:id', async (req, res) => {
    try {
        const petId = req.params.id;
        // Aquí debes realizar la lógica para eliminar la mascota con el ID proporcionado
        await Pet.findByIdAndRemove(petId);
        res.redirect('/giveto'); // Redirige de vuelta a la página de la lista de mascotas
    } catch (error) {
        console.error('Error al eliminar la mascota:', error);
        res.redirect('/giveto');
    }
});

//End delete pets

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}


 
// Agrega una ruta para /home en tu archivo de rutas principal





module.exports = router;
