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
    favorite: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    
    image: {
        data: Buffer,
        contentType: String
    },

    plan:{
        breakfast: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'item'
        }],
        lunch: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'item'
        }],
        dinner: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'item'
        }]
    }
})

module.exports = mongoose.model('user',userSchema)