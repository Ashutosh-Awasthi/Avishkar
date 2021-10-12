const mongoose = require('mongoose')

itemSchema = new mongoose.Schema({
    name: String,
    image: String,
    nutrients: Object,
    calorie: Number
})

module.exports = mongoose.model('itme',itemSchema)