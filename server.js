const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./app/routes/user");

const app = express();

// Configuración del puerto
const port = process.env.PORT || 3001;

// Configuración de la base de datos
const dbUri = "mongodb://localhost:27017/proyecto_grado_db"; // Cambiar 'proyecto_grado_db' al nombre deseado de la base de datos

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("Error de conexión a MongoDB:", err);
});

// Middleware para analizar los cuerpos de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas de usuario
app.use("/user", userRoutes);

// Ruta para la página de inicio de sesión
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  next(error);
});

// Manejo de errores
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500).json({ message: error.message });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
