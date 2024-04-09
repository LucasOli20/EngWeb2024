var mongoose = require("mongoose")

const { modelName } = require("../model/pessoas")
var pessoa = require("../model/pessoas")

module.exports.list = () => {
    return pessoa
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.insert = (pessoa) => {
    if((pessoa.find({BI}).exec()).length != 1){
        var newPessoa = new Pessoa(pessoa)
        return newPessoa.save()
    }
}

module.exports.remove = (Bi) => {
    pessoa
        .find({Bi})
        .deleteOne()
        .exec()
}

module.exports.update = (Bi, pessoa) => {
    return pessoa
        .findByIdAndUpdate(Bi, pessoa, {new : true})
        .exec()
}