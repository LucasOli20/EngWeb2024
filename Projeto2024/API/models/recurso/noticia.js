var mongoose = require('mongoose');

var noticiaSchema = new mongoose.Schema({
    _id : String, // Gerado automaticamente ??
    dataNoticia : Date, // Data da noticia
    cursoId : String,
    idRecurso : {type : String, required : false},
    conteudo : String,
    autor : String // Pode ser gerado automaticamente pelo sistema ou um Admin
}, { versionKey: false });

module.exports = mongoose.model('noticia', noticiaSchema, 'noticia')
