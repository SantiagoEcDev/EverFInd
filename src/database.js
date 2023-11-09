const mongoose = require('mongoose');
const { mongodb } = require('./keys');


mongoose.connect(mongodb.URI, {
      
})
    .then(db => console.log('Connected to MongoDb Atlas'))
    .catch(err => console.error(err))