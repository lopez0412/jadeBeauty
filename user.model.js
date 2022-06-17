const mongoose = require('mongoose')

const User = mongoose.model('User',{
    email: {type: String, required:true,minLength: 5},
    password: {type: String, required:true},
    nombre: {type: String, required:true},
    numTel: {type: String},
    salt: {type: String, required:true},
})

module.exports = User