var express = require('express');
var router = express.Router();
var axios = require("axios");
const { v4: uuidv4 } = require('uuid');
var API = require('../config/apiEnv')
var Auth = require('../controllers/auth');

/* GET home page. */
router.get('/', Auth.verifyAcess, function(req, res, next) {
    axios.get(API.apiRoute('/noticia?token=' + req.cookies.token))
        .then(resp => {
            var noticias = resp.data
            const message = req.session.message;
            delete req.session.message;
            res.status(200).render("listaNoticias", {"lNoticias": noticias, "message": message, userRole : req.userRole})
        })
        .catch(erro => {
            res.status(501).render("error", {"error" : erro})
        })
});

router.get('/adicionar', Auth.verifyAcess, function(req, res, next) {
    axios.get(API.apiRoute('/curso?token=' + req.cookies.token))
        .then(resp => {
            var cursos = resp.data
            axios.get(API.apiRoute('/recurso?token=' + req.cookies.token))
                .then(resp1 => {
                    var recursos = resp1.data
                    res.status(200).render("adicionarNoticia", {"Cursos" : cursos, "Recursos" : recursos})
                })
        })
    
});

router.post('/adicionar', Auth.verifyAcess, function(req, res, next) {
    console.log(req.body)

    const uniqueId = uuidv4();

    req.body._id = uniqueId
    req.body.dataNoticia = Date.now()

    var result = req.body

    console.log(result)

    axios.post(API.apiRoute('/noticia?token=' + req.cookies.token), result)
        .then(resp => {
            console.log("Noticia publicada com sucesso!")
            req.session.message = "Noticia publicada com sucesso!"
            res.status(200).redirect('/noticia')
        })
        .catch(erro => {
            res.status(503).render("error", {"error" : error})
        })
});

router.get('/edit/:id', Auth.verifyAcessAdmin, function(req, res, next) {
    axios.get(API.apiRoute('/noticia/' + req.params.id + '?token=' + req.cookies.token))
        .then(resp => {
            noticia = resp.data
            noticia.dataNoticia = new Date(noticia.dataNoticia).toISOString().split('T')[0]
            console.log(noticia)
            res.status(200).render("editarNoticia", {"Noticia" : noticia})
        })
        .catch(erro => {
            res.status(502).render("error", {"error" : erro})
        })
});

router.post('/edit/:id', Auth.verifyAcessAdmin, function(req, res, next) {

    var noticia = req.body
    console.log(noticia)

    axios.put(API.apiRoute('/noticia/' + req.params.id + '?token=' + req.cookies.token), noticia)
        .then(resp => {
            req.session.message = "Noticia editada com sucesso!";
            res.redirect('/noticia/' + req.params.id)
        })
        .catch(erro => {
            res.status(503).render("error", {"error" : erro})
        })
});

router.get('/delete/:id', Auth.verifyAcessAdmin, function(req, res, next) {
    axios.delete(API.apiRoute('/noticia/' + req.params.id + '?token=' + req.cookies.token))
        .then(resp => {
            console.log("Noticia eliminada com sucesso!")
            req.session.message = "Noticia eliminada com sucesso!";
            res.redirect('/noticia')
        })
        .catch(erro => {
            res.status(503).render("error", {"error" : erro})
        })
});

router.get('/:id', Auth.verifyAcess, function(req, res, next) {
    axios.get(API.apiRoute('/noticia/' + req.params.id + '?token=' + req.cookies.token))
        .then(resp => {
            var noticia = resp.data
            const message = req.session.message;
            delete req.session.message;
            res.status(200).render("paginaNoticia", {"Noticia": noticia, "message" : message, userRole : req.userRole})
        })
        .catch(erro => {
            res.status(504).render("error", {"error" : erro})
        })
});

module.exports = router;
