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

io.on('connection', onConnected)

function onConnected(socket) {
    console.log('A usuario has connected')
    socketsConected.add(socket.id)
    
    io.emit('clients-total',socketsConected.size)

    socket.on('disconnect', () =>{
        console.log('Socket disconnected', socket.id)
        socketsConected.delete(socket.id)
        io.emit('clients-total', socketsConected.size)
    })


    socket.on('message', async (data) => {
        try {
          const newMessage = new Message({
            sender: data.name,
            content: data.message,
          });
      
          // Guardar el mensaje en la base de datos
          await newMessage.save();
      
          // Enviar el mensaje a todos los clientes, incluido el remitente
          io.emit('chat-message', data);
        } catch (error) {
          console.error('Error saving message:', error.message);
        }
      });
      
    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
      })
    }

