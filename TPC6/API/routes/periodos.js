var express = require('express');
var router = express.Router();
var Periodo = require('../controllers/periodos')


router.get('/', function(req, res, next) {
    if (req.query.designacao){
        Periodo.getByDesignacao(req.query.designacao)
            .then(data => {
                res.jsonp(data)
            })
            .catch(erro => {
                res.jsonp(erro)
            })
    } else {
        Periodo.list()
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
    }   
});

router.get('/:id', function(req, res, next) {
    Periodo.findById(req.params.id)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});

router.delete('/:id', function(req, res, next) {
    Periodo.remove(req.params.id)
        .then(data => {
            console.log("Compositor eliminado com sucesso!")
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});

router.post('/', function(req, res, next) {
    Periodo.insert(req.body)
        .then(data => {
            console.log("Compositor registado com sucesso!")
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});

router.put('/:id', function(req, res, next) {
    Periodo.update(req.params.id, req.body)
        .then(data => {
            console.log("Compositor atualizado com sucesso!")
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});


module.exports = router;