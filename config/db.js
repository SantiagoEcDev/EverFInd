const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/my_app_node';

module.exports = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión correcta a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
};
