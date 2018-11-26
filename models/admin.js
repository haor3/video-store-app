const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Admin Schema
const AdminSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

Admin.insertMany(
    [
        {name: "Tam Dang", email: "tamdang@gbc.com", username: "tamdang@gbc.com", password: "123456"},
        {name: "Hao Bui", email: "haobui@gbc.com", username: "haobui@gbc.com", password: "123456"},
        {name: "Admin", email: "admin@gbc.com", username: "admin", password: "admin"}
    ]
)

module.exports.getUserById = function(id, callback) {
    Admin.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    Admin.findOne(query, callback);
}

module.exports.addAdmin = function(newAdmin, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save(callback); 
        })
    })
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}