var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
    axios.get("http://localhost:3000/compositores")
        .then(resp => {
            compositores = resp.data
            res.status(200).render("paginaListaCompositores" , {"lCompositores" : compositores})
        })
        .catch(erro => {
            res.status(500).render("error", {"error" : erro})
        })
});

router.get('/edit/:idCompositor', function(req, res, next) {
    axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
        .then(resp => {
            compositor = resp.data
            res.status(200).render("paginaEditCompositor" , {"Compositor" : compositor})
        })
        .catch(erro => {
            res.status(501).render("error", {"error" : erro})
        })
});

router.get('/delete/:idCompositor', function(req, res, next) {
    axios.delete("http://localhost:3000/compositores/" + req.params.idCompositor)
        .then(resp => {
            console.log("Compositor eliminado com sucesso!")
            res.redirect("/")
        })
        .catch(erro => {
            res.status(502).render("error", {"error" : erro})
        })
});

router.get('/registo', function(req, res, next) {
    axios.get("http://localhost:3000/periodos")
        .then(resp => {
            periodos = resp.data
            res.status(200).render("paginaRegistoCompositores", {"Periodos" : periodos})
        })
        .catch(erro => {
            res.status(503).render("error", {"error" : erro})
        })
});

router.get('/:idCompositor', function(req, res, next) {
    axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
        .then(resp => {
            compositor = resp.data
            res.status(200).render("paginaCompositor" , {"Compositor" : compositor})
        })
        .catch(erro => {
            res.status(504).render("error", {"error" : erro})
        })
});

router.post('/registo', function(req, res, next) {
    var result = req.body
    axios.post("http://localhost:3000/compositores", result)
        .then(resp => {
            console.log("Compositor registado com sucesso")
            res.redirect("/")
        })
        .catch(erro => {
            res.status(505).render("error", {"error" : erro})
        })
});

router.post('/edit/:idCompositor', function(req, res, next) {
    var result = req.body
    axios.put("http://localhost:3000/compositores/" + req.params.idCompositor, result)
        .then(resp => {
            console.log("Compositor editado com sucesso")
            res.redirect("/")
        })
        .catch(erro => {
            res.status(506).render("error", {"error" : erro})
        })
});



module.exports = router;
