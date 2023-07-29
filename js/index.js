const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');

const app = express();

// Configuración de Passport.js
passport.use(
  new GoogleStrategy(
    {
      clientID: '982774708892-edt942q84021d9mop1rssjrvpe6h1vu6.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // Aquí puedes almacenar el perfil de usuario en tu base de datos o realizar otras acciones
      return done(null, profile);
    }
  )
);

// Serializa el perfil de usuario para almacenarlo en una sesión
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserializa el perfil de usuario almacenado en la sesión
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Configuración de la sesión con cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    keys: ['1904*']
  })
);

// Inicializa Passport.js y la sesión
app.use(passport.initialize());
app.use(passport.session());

// Ruta de inicio de sesión con Google
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Ruta de callback después de la autenticación de Google
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Aquí puedes redirigir o realizar otras acciones después de la autenticación exitosa
    res.redirect('/dashboard');
  }
);

// Ruta de cierre de sesión
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Ruta protegida (ejemplo: página de inicio)
app.get('/dashboard', (req, res) => {
  // Verifica si el usuario está autenticado
  if (req.isAuthenticated()) {
    // Aquí puedes acceder a req.user para obtener los datos del perfil del usuario
    res.send('¡Bienvenido!');
  } else {
    res.redirect('/login');
  }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
// Ruta de inicio de sesión (opcional)
app.get('/login', (req, res) => {
  res.send('Por favor, inicia sesión');
});

// Puerto de escucha del servidor
app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
