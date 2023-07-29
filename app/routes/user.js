const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Ruta para el registro de usuarios
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya está registrado." });
    }

    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    await user.save();

    // Redireccionar al usuario a la página de inicio de sesión
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario." });
  }
});

// Rutas adicionales y funciones...

module.exports = router;
