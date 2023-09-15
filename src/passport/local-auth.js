const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    
        const existingUser = await User.findOne({ email: email });
        
        if (existingUser) {
            return done(null, false, req.flash('signupMessage', 'El correo ya está en uso'));
        } else {
            const newUser = new User();
            newUser.name = req.body.name;
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            
            await newUser.save();
            return done(null, newUser);
        }
    }
)); 

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    
    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    done(null, user);
}))
