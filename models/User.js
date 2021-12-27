const mongoose = require('mongoose')

userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: String,
    username:{
        type: String,
        required: true
    },
    physique:{
        height: Number,
        weight: Number,
        bmi: Number,
        age: Number
    },

    image: String,

    plan: [{
        type: Object
    }]
    
})

module.exports = mongoose.model('user',userSchema)