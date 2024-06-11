var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
    axios.get("http://localhost:3000/periodos")
        .then(resp => {
            periodos = resp.data
            res.status(200).render("paginaListaPeriodos" , {"lPeriodos" : periodos})
        })
        .catch(erro => {
            res.status(500).render("error", {"error" : erro})
        })
});

router.get('/edit/:idPeriodo', function(req, res, next) {
    axios.get("http://localhost:3000/periodos/" + req.params.idPeriodo)
        .then(resp => {
            periodo = resp.data
            res.status(200).render("paginaEditPeriodo" , {"Periodo" : periodo})
        })
        .catch(erro => {
            res.status(501).render("error", {"error" : erro})
        })
});

router.get('/delete/:idPeriodo', function(req, res, next) {
    axios.delete("http://localhost:3000/periodos/" + req.params.idPeriodo)
        .then(resp => {
            console.log("Periodo eliminado com sucesso!")
            res.redirect("/periodos")
        })
        .catch(erro => {
            res.status(502).render("error", {"error" : erro})
        })
});

router.get('/registo', function(req, res, next) {
    res.status(200).render("paginaRegistoPeriodo")
});

router.get('/:idPeriodo', function(req, res, next) {
    axios.get("http://localhost:3000/periodos?designacao=" + req.params.idPeriodo)
        .then(resp => {
            periodo = resp.data
            res.status(200).render("paginaPeriodo" , {"Periodo" : periodo})
        })
        .catch(erro => {
            res.status(504).render("error", {"error" : erro})
        })
});

router.post('/registo', function(req, res, next) {
    axios.get("http://localhost:3000/periodos")
        .then(resp => {
            periodos = resp.data
            let novoId = "p" + (periodos.length + 1).toString();
            var result = req.body
            result._id = novoId
            console.log(result)
            axios.post("http://localhost:3000/periodos", result)
                .then(resp => {
                    console.log("Periodo registado com sucesso")
                    res.redirect("/periodos")
                })
                .catch(erro => {
                    res.status(505).render("error", {"error" : erro})
                })
        })
        .catch(error => {
            res.status(505).render("error", {"error" : error})
        })
});

router.post('/edit/:idCompositor', function(req, res, next) {
    var result = req.body
    axios.put("http://localhost:3000/periodos/" + req.params.idCompositor, result)
        .then(resp => {
            console.log("Periodo editado com sucesso")
            res.redirect("/periodos")
        })
        .catch(erro => {
            res.status(506).render("error", {"error" : erro})
        })
});

module.exports = router;
