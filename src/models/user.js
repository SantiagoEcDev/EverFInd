const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    phone: String,
    description: String,
    city: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isAdmin: Boolean, // Nuevo campo para indicar si es administrador

});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
