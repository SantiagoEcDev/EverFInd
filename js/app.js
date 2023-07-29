// app.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/login_example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
// En el mismo archivo app.js, debajo de la configuración del servidor

// Definir el modelo de usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  const User = mongoose.model('User', userSchema);
 // En el mismo archivo app.js, debajo de la definición del modelo de usuario

app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
      }
  
      // Cifrar la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el nuevo usuario en la base de datos
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'Registro exitoso.' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Buscar al usuario en la base de datos
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      // Verificar la contraseña cifrada
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta.' });
      }
  
      res.status(200).json({ message: 'Inicio de sesión exitoso.' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  });
    