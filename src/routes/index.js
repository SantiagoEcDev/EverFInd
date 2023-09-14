const express = require('express');
const router = express.Router();
const passport = require('passport');

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

// router.post('/signin', passport.authenticate('local-signin', {
//     succesRedirect: '/home',
//     failureRedirect: '/signin',
//     passReqToCallback: true
// }));

// router.get('/signin', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'signin.html')); // Renderiza la vista home
// });

// router.post('/signin', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'signin.html')); // Renderiza la vista home
// });





// Agrega una ruta para /home en tu archivo de rutas principal
router.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html')); // Renderiza la vista home
});

router.post('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html')); // Renderiza la vista home
});




module.exports = router;
