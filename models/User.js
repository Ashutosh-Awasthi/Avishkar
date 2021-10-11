const mongoose = require('mongoose')

userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String
})

module.exports = mongoose.model('user',userSchema)