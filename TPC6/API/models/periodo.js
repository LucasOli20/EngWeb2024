var mongoose = require('mongoose')

var periodoSchema = new mongoose.Schema({
    _id : String,
    designacao : String
}, {versionKey : false})

module.exports = mongoose.model('periodos', periodoSchema, 'periodos')