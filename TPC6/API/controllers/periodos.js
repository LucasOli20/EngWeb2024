var mongoose = require("mongoose")
var Periodo = require("../models/periodo")

module.exports.list = () => {
    return Periodo
        .find()
        .sort({designacao : 1})
        .exec()
}

module.exports.findById = id => {
    return Periodo
        .findOne({_id : id})
        .exec()
}

module.exports.insert = (periodo) => {
    if((Periodo.find({_id : periodo._id}).exec()).length != 1){
        var newPeriodo = new Periodo(periodo) // new modelName começa com maiuscula
        return newPeriodo.save()
    }
}

module.exports.remove = (id) => {
    return Periodo
        .find({_id : id})
        .deleteOne()
        .exec()
}

module.exports.update = (id, periodo) => {
    return Periodo
    .findByIdAndUpdate(id,periodo, {new:true})
    .exec()
}

module.exports.getByDesigncao = (desig) => {
    return Periodo
    .findOne({designacao : desig})
    .exec()
}