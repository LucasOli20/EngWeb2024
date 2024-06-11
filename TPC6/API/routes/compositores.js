var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositores')


router.get('/', function(req, res, next) {
    Compositor.list()
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});

router.get('/:id', function(req, res, next) {
    Compositor.findById(req.params.id)
        .then(data => {
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});

router.delete('/:id', function(req, res, next) {
    Compositor.remove(req.params.id)
        .then(data => {
            console.log("Compositor eliminado com sucesso!")
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});

router.post('/', function(req, res, next) {
    Compositor.insert(req.body)
        .then(data => {
            console.log("Compositor registado com sucesso!")
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});

router.put('/:id', function(req, res, next) {
    Compositor.update(req.params.id, req.body)
        .then(data => {
            console.log("Compositor atualizado com sucesso!")
            res.jsonp(data)
        })
        .catch(erro => {
            res.jsonp(erro)
        })
});


module.exports = router;