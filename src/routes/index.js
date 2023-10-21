const express = require('express');
const router = express.Router();
const passport = require('passport');
const Pet = require('../models/myPets');
const User = require('../models/user')
const path = require('path');
const multer = require('multer')

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configura Cloudinary
          
cloudinary.config({ 
  cloud_name: 'dr8dplsp9', 
  api_key: '213597497949877', 
  api_secret: 'sXcT4s2778dA9L6AbY0ow4J7xeE' 
});

// Configura el almacenamiento
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mascotas', 
    format: async (req, file) => 'png', // soporta promesas
    public_id: (req, file) => file.originalname
  },
});

const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'perfiles', 
    format: async (req, file) => 'png', 
    public_id: (req, file) => 'perfil-' + req.user.id // esto asegura un ID único para cada usuario
  },
});


// Middleware de Multer
const parser = multer({ storage: storage });


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

        const profileImage = req.user.profileImage;

        // Renderiza la vista 'profile' y pasa la lista de mascotas y el nombre del usuario como contexto
        res.render('profile', { users, username, email, profileImage, req });
        
    } catch (error) {
        console.error('Error al obtener la lista de mascotas:', error);
        res.redirect('/'); // Redirige a la página de inicio o maneja el error de acuerdo a tus necesidades
    }
    
});

router.post('/uploadProfile', parser.single('image'), async (req, res) => {
  if (!req.file) {
      return res.send('No se subió ninguna imagen.');
  }

  const image = req.file.path;
  
  // Aquí, suponiendo que "user" es tu modelo y tienes el usuario actual en req.user
  const currentUser = await User.findById(req.user._id);
  currentUser.profileImage = image;
  await currentUser.save();

  res.redirect('/profile'); 
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
    const phone = req.body.phone;
    const description = req.body.description;
    const city = req.body.city;
  
    // Actualiza el usuario en la base de datos
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.description = description;
    user.city = city;
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
      description: user.description,
      phone: user.phone,
      city: user.city
    };
    try {
      res.render('profile', data, { locals: { req } });
    } catch (error) {
      // Maneja el error
      console.error('Error al renderizar la vista:', error);
    }
  
    // Redirecciona a / si la sesión está cerrada
      res.redirect('/home');
  });

  router.post('/deleteProfilePic', isAuthenticated, async (req, res) => {
    try {
        // Si el usuario no tiene una imagen de perfil, simplemente redirige
        if (!req.user.profileImage) {
            return res.redirect('/profile');
        }
        
        // Obtiene el ID de la imagen desde la URL
        let publicId = req.user.profileImage.split('/').pop().split('.')[0];

        // Elimina la imagen de Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Actualiza el modelo del usuario para eliminar el URL de la imagen del perfil
        req.user.profileImage = null;
        await req.user.save();

        // Redirige al usuario a la misma página (o donde quieras)
        res.redirect('/profile');
    } catch (error) {
        console.error("Error al eliminar la imagen: ", error);
        res.redirect('/profile');
    }
});
  
//Añadir una mascota
  router.post('/addPet', parser.single('image'), async (req, res) => {
    const { name, age, type, breed, status, description, createdAt } = req.body;

    // Aquí, req.file contiene información sobre la imagen subida, incluyendo la URL en Cloudinary
    const imagePath = req.file.path;

    try {
        const newPet = new Pet({
            name,
            age,
            type,
            breed,
            status,
            description,
            createdAt,
            owner: req.user.name,
            imagePath
        });

        await newPet.save();
        res.redirect('/giveto');
    } catch (error) {
        console.error('Error al guardar la mascota:', error);
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

      // Si estás utilizando Passport.js o algún middleware similar, probablemente tengas acceso a req.user
      // Obtén el ID del usuario autenticado
      const currentUserId = req.user._id; // Cambia `_id` si tu identificador tiene un nombre diferente en el objeto de usuario

      // Renderiza la vista 'home' y pasa la lista de mascotas, los conteos y el currentUserId como contexto
      res.render('home', { pets, dogCount, catCount, currentUserId });
  } catch (error) {
      console.error('Error al obtener la lista de mascotas:', error);
      res.redirect('/'); // Maneja el error de acuerdo a tus necesidades
  }
});

router.post('/addFriend', isAuthenticated, async (req, res) => {
  const { userId, friendId } = req.body;

  try {
      // Busca al usuario por su nombre (en este caso, friendId contiene el nombre)
      const owner = await User.findOne({ name: friendId });

      if (!owner) {
          throw new Error('El propietario no se encuentra');
      }

      // Luego, con el usuario encontrado, procedemos como antes:
      if (!owner.friends.includes(userId)) {
          owner.friends.push(userId);
          await owner.save();
      }

      res.redirect('/home');  // Redirige a donde quieras después de agregar el amigo

  } catch (error) {
      console.error('Error al agregar amigo:', error);
      res.redirect('/home');  // O maneja el error como prefieras
  }
});

router.get('/requests', isAuthenticated, async (req, res, next) => {
  try {
      // Suponiendo que req.user._id te da el ID del usuario actualmente autenticado
      const user = await User.findById(req.user._id).populate('friends');
      
      if (!user) {
          throw new Error('Usuario no encontrado.');
      }

      res.render('requests', { friends: user.friends });

  } catch (error) {
      console.error('Error al obtener la lista de amigos:', error);
      res.redirect('/');  // O maneja el error como prefieras, por ejemplo redirigiendo a la página principal.
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
