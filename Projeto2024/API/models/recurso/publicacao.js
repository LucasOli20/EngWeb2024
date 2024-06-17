var mongoose = require('mongoose');

var publicacaoSchema = new mongoose.Schema({
    _id : String, // Gerado automaticamente ??
    cursoId : String,
    idRecurso : String,
    conteudo : String,
    dataRegisto : Date,
    idAutor : String,
    autor : String,
    listaComentarios : [{
        idUser : String,
        nomeUser : String,
        comentario : String
    }],
}, { versionKey: false });

module.exports = mongoose.model('publicacao', publicacaoSchema, 'publicacao')
