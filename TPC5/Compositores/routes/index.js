var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
    axios.get("http://localhost:3000/compositores?_sort=nome")
        .then(resp => {
            compositores = resp.data
            res.status(200).render("paginaListaCompositores" , {"lCompositores" : compositores})
        })
        .catch(erro => {
            res.status(500).render("error", {"error" : erro})
        })
});

module.exports = router;
