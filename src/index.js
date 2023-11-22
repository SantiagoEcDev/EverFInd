const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//Initializations
const app = express();
require('./database')
require('./passport/local-auth')



// Configuraciones
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    next();
})


// Rutas
app.use('/', require('./routes/index'));

// Iniciando servidor
const server = app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
}) ;

const io = require('socket.io')(server)

let socketsConected = new Set()

iio.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Listen for incoming chat messages
    socket.on('chat message', (data) => {
      console.log('Received message:', data);
  
      // Save the message to MongoDB
      const message = new Message({ user: data.user, text: data.message });
      message.save((err) => {
        if (err) {
          console.error('Error saving message to database:', err);
        } else {
          console.log('Message saved to the database');
        }
      });
  
      // Broadcast the message to all connected clients
      io.emit('chat message', data);
    });
  
    // Listen for user disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });