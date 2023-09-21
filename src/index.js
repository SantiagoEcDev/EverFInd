const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash')

//Initializations
const app = express();
require('./database')
require('./passport/local-auth')


// Configuraciones
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine)
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
app.set('port', process.env.PORT || 3000);

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
    app.locals.signupMessage = req.flash('signMessage');
    app.locals.signupMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
})

// Rutas
app.use('/', require('./routes/index'));

const mascotasRouter = require('./controllers/myPets');
app.use('/', mascotasRouter);



// Iniciando servidor
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
});
