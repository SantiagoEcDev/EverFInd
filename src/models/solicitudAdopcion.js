const mongoose = require('mongoose');

// Definir el esquema para las solicitudes de adopción
const SolicitudAdopcionSchema = new mongoose.Schema({
    mascota: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mascota',
        required: true
    },
    interesado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

// Crear el modelo a partir del esquema
const SolicitudAdopcion = mongoose.model('SolicitudAdopcion', SolicitudAdopcionSchema);

module.exports = SolicitudAdopcion;