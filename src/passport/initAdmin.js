// passport.initAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

async function createAdmin() {
    try {
        const existingAdmin = await User.findOne({ isAdmin: true });

        if (!existingAdmin) {
            const hashedPassword = bcrypt.hashSync('adminPassword', bcrypt.genSaltSync(10));

            const newAdmin = new User({
                name: 'Admin',
                email: 'admin@example.com',
                password: hashedPassword,
                isAdmin: true,
                // Otros campos según tus necesidades
            });

            await newAdmin.save();
            console.log('Usuario administrador creado exitosamente.');
        } else {
            console.log('Ya existe un usuario administrador.');
        }
    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    }
}

mongoose.connect('mongodb://localhost:27017/everfind', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

createAdmin();
