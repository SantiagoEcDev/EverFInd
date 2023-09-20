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

router.get('/home', isAuthenticated, (req, res, next) => {
    res.render('home'); // Renderiza la vista home
});


router.get('/settings', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'settings.html'));
});


function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
 
// Agrega una ruta para /home en tu archivo de rutas principal





module.exports = router;
