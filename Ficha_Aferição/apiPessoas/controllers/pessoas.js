var mongoose = require("mongoose")

const { modelName } = require("../model/pessoas")
var pessoa = require("../model/pessoas")

module.exports.list = () => {
    return pessoa
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.findByBI = BI => {
    return pessoa
        .findOne({BI : BI})
        .exec()
}

module.exports.insert = (pessoa) => {
    if((pessoa.find({BI : pessoa.BI}).exec()).length != 1){
        var newPessoa = new Pessoa(pessoa)
        return newPessoa.save()
    }
}

module.exports.remove = (Bi) => {
    pessoa
        .find({Bi : Bi})
        .deleteOne()
        .exec()
}

module.exports.update = (Bi, pessoa) => {
    return pessoa
        .findByBIAndUpdate(Bi, pessoa, {new : true})
        .exec()
}

// module.exports.listModalidades = () => {
//     return pessoa
//         .aggregate([
//             { $unwind: "$pessoas" },
//             { $unwind: "$pessoas.desportos"},
//             { $group: {_id: "$pessoas.desportos"} },
//             { $sort: {_id: 1}}
//         ])
//         .exec()
// }

module.exports.listModalidades = () => {
    return pessoa.aggregate([
        { $unwind: "$pessoas" }, 
        { $unwind: "$pessoas.desportos" },
        { $group: { _id: "$pessoas.desportos" } },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, nome: "$_id" } },
        { $group: { _id: null, desportos: { $push: "$nome" } } }
    ]).exec().then(result => {
        return result.length > 0 ? result[0].desportos : [];
    });
};