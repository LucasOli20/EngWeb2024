var mongoose = require('mongoose')

var compositorSchema = new mongoose.Schema({
    _id : String,
    nome : String,
    dataNasc : String,
    dataObito : String,
    bio : String,
    periodo : String
}, {versionKey : false})

module.exports = mongoose.model('compositores', compositorSchema, 'compositores')