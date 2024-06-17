var Recurso = require('../models/recurso/recurso')
var TipoRecurso = require('../models/recurso/tipoRecurso')

// Lista todos os recursos
module.exports.list = () => {
    return Recurso
        .find()
        .sort({dataRegisto : 1}) // TODO: Verificar se os recursos mais recentes ficam no topo.
        .exec()
}

// Procurar um recurso pelo seu id
module.exports.findById = (id) => {
    return Recurso
        .findOne({_id : id})
        .exec()
}

// Procurar um recurso pelo Produtor/Docente
module.exports.findByProdutor = (idProdutor) => {
    return Recurso
        .find({idProdutor : idProdutor})
        .exec()
}

// Procurar um recurso por autor
module.exports.findByAutor = (autor) => {
    return Recurso
        .find({autor : autor})
        .exec()
}

// Listar todos os Tipo
module.exports.listTipos = () => {
    // TODO Talvez aqui devolver uma lista???
    console.log("listtipos")
    return TipoRecurso
        .find()
        .sort({"designacao" : 1})
        .exec()
}

// Listar recursos por tipo
module.exports.findByTipo = (tipoId) => {
    return Recurso
        .find({'tipo' : tipoId})
        .exec()
}

module.exports.insert = (recurso) => {
    var newRecurso = new Recurso(recurso)
    return newRecurso.save() 
}

module.exports.update = (id, recurso) => {
    return Recurso
        .findByIdAndUpdate(id, recurso, {new : true})
        .exec()
}

module.exports.delete = (id) => {
    return Recurso
        .findByIdAndDelete(id)
        .exec()
}

module.exports.findTipoById = (id) => {
    return TipoRecurso
        .findOne({_id : id})
        .exec()
}

module.exports.insertTipo = (tipo) => {
    // TODO verificar aqui como iremos fazer a cena do id :)
    var newTipo = new TipoRecurso(tipo)
    return newTipo.save()
}

module.exports.updateTipo = (id, tipo) => {
    return TipoRecurso
        .findByIdAndUpdate(id, tipo, {new : true})
        .exec()
}

module.exports.deleteTipo = (id) => {
    return TipoRecurso
        .findByIdAndDelete(id)
        .exec()
}

module.exports.updateClassificacao = (recursoId, idUtilizador, nrEstrelas) => {
    return Recurso.findById(recursoId)
        .then(recurso => {
            if (!recurso) {
                throw new Error('Recurso não encontrado');
            }

            // Verificar se o usuário já classificou este recurso
            const classificacaoExistente = recurso.classificacao.find(classif => classif.idUtilizador === idUtilizador);
            if (classificacaoExistente) {
                // Atualizar a classificação existente
                classificacaoExistente.nrEstrelas = nrEstrelas;
            } else {
                // Adicionar nova classificação
                recurso.classificacao.push({ idUtilizador, nrEstrelas });
            }

            // Salvar o recurso atualizado
            return recurso.save();
        });
}

module.exports.getRecursosInfo = lista => {
    return Recurso.find({_id : {
        $in : lista 
    }}, {_id : 1, titulo : 1, autor : 1})
    .sort('titulo')
        .then(info => {
            return info
        })
        .catch(erro => {
            throw erro
        })
}