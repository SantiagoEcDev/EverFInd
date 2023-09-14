const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

//Initializations
const app = express();
require('./database')
require('./passport/local-auth')
const flash = require('connect-flash')

// Configuraciones
app.use(express.static(path.join(__dirname, 'views')));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signMessage')
    next();
})

// Rutas
app.use('/', require('./routes/index'));


// Iniciando servidor
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
});
