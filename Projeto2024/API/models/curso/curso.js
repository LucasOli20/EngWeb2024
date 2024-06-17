var mongoose = require('mongoose');

var cursoSchema = new mongoose.Schema({
    _id : String,
    designacao : String,
    descricao : String,
    idProdutor : String,
    listaRecursos : [String],
    listaInscritos : [String]
}, { versionKey: false });

module.exports = mongoose.model('curso', cursoSchema, 'curso')
