const mongoose = require('mongoose')

itemSchema = new mongoose.Schema({
    name: String,
    image: String,
    nutrients: Object,
    calorie: Number,
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('item',itemSchema)