const model = require('../models/user');

/** Obtener los datos de los USUARIOS */
exports.getData = async (req, res) => {
  try {
    const docs = await model.find({});
    res.send({ docs });
  } catch (error) {
    console.error('Error al obtener datos de usuarios:', error);
    res.status(500).json({ message: 'Error al obtener datos de usuarios' });
  }
};

/** Insertar datos de los USUARIOS */
exports.insertData = (req, res) => {
  const data = req.body;
  model.create(data)
    .then(docs => {
      res.send({ data: docs });
    })
    .catch(error => {
      console.error('Error al insertar datos de usuarios:', error);
      res.status(500).json({ message: 'Este email ya existe' });
    });
};
