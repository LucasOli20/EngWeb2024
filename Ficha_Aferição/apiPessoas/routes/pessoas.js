var express = require('express');
var router = express.Router();
var Pessoa = require("../controllers/pessoas")

router.get('/', function(req, res, next) {
    Pessoa.list()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  });
  
  router.post('/', function(req, res, next) {
    Pessoa.insert(req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  });
  
  router.put('/:BI', function(req, res, next) {
    Pessoa.update(req.params.BI, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  });
  
  router.post('/:BI', function(req, res, next) {
    Pessoa.delete(req.params.BI)
      .then(console.log("Deleted " + req.params.id))
      .catch(erro => res.jsonp(erro))
  });
  
  module.exports = router;