const express = require('express');
const router = express.Router();
const passport = require('passport');
const Pet = require('../models/myPets');
const User = require('../models/user')
const path = require('path');

// Ruta para la página de inicio
router.get('/', (req, res, next) => {
    res.render('index');
});

// Ruta para la página de registro (signup)
router.get('/signup', (req, res, next) => {
    res.render('signup');
    
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
    failureRedirect: '/signup',
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


//Cargar los datos de las mascotas
router.get('/giveto', isAuthenticated,async (req, res, next) => {
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

router.get('/profile', isAuthenticated, async (req, res, next) => {
    try {
        // Obtén la lista de mascotas desde la base de datos
        const users = await User.find();

        // Obtén el nombre del usuario logeado
        const username = req.user.name;

        const email = req.user.email;

        // Renderiza la vista 'profile' y pasa la lista de mascotas y el nombre del usuario como contexto
        res.render('profile', { users, username, email, req });
        
    } catch (error) {
        console.error('Error al obtener la lista de mascotas:', error);
        res.redirect('/'); // Redirige a la página de inicio o maneja el error de acuerdo a tus necesidades
    }
    
});

// Ruta para modificar el nombre y el correo electrónico
router.post('/profile', async (req, res, next) => {
    // Verifica que el usuario esté autenticado
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    // Verifica que el usuario exista en la base de datos
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  
    // Obtén los valores nuevos del nombre y el correo electrónico
    const name = req.body.name.toString();
    const email = req.body.email;
  
    // Actualiza el usuario en la base de datos
    user.name = name;
    user.email = email;
    try {
      await user.save();
    } catch (error) {
      // Maneja el error
      if (error.name === 'DocumentNotFoundError') {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        return res.status(500).json({ error: 'Ocurrió un error al actualizar el usuario' });
      }
    }
  
    // Actualiza el componente de la vista
    const data = {
      name: user.name,
      email: user.email,
    };
    try {
      res.render('profile', data, { locals: { req } });
    } catch (error) {
      // Maneja el error
      console.error('Error al renderizar la vista:', error);
    }
  
    // Redirecciona a / si la sesión está cerrada
    if (!req.session.user) {
      res.redirect('/');
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

router.get('/home', isAuthenticated, async (req, res, next) => {
  try {
      // Obtén la lista de mascotas desde la base de datos o de donde sea necesario
      const pets = await Pet.find();

      // Obtén el conteo de perros y gatos
      const dogCount = await Pet.countDocuments({ type: "Perro" });
      const catCount = await Pet.countDocuments({ type: "Gato" });

      // Renderiza la vista 'home' y pasa la lista de mascotas y los conteos como contexto
      res.render('home', { pets, dogCount, catCount });
  } catch (error) {
      console.error('Error al obtener la lista de mascotas:', error);
      res.redirect('/'); // Maneja el error de acuerdo a tus necesidades
  }
});

router.get('/requests', isAuthenticated, (req, res, next) => {
    res.render('requests');
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
