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
        bmi: Number
    },
    favorite: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    target: Object
})

module.exports = mongoose.model('user',userSchema)