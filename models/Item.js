const mongoose = require('mongoose')

itemSchema = new mongoose.Schema({
    data: {type: Object}
})

module.exports = mongoose.model('item',itemSchema)