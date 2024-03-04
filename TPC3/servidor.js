var http = require('http')
var url = require('url')
var axios = require('axios')

http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})

    var q = url.parse(req.url, true)

    if(q.pathname == '/'){

        res.write("<h1>Cinema</h1>")
        res.write("<h2>Escolha uma das seguintes opções: </h2>")
        res.write("<ul>")
        res.write("<li><a href=filmes>Filmes</a></li>")
        res.write("<li><a href=generos>Generos</a></li>")
        res.write("<li><a href=atores>Atores</a></li>")
        res.write("</ul>")
        res.end()
    }
    else if(q.pathname == "/filmes"){
        axios.get("http://localhost:3000/filmes?_sort=titulo")
        .then((dados) => {

            res.write("<ul>")

            for (i in dados.data){

                // console.log("Linha: " + i)
                // console.log("Linha: " + i + "ID: " + dados.data[i].idFilme)

                res.write("<li><a href='/filmes/" + dados.data[i].idFilme + "'>" + dados.data[i].titulo + "</a></li>")
            }
            res.write("</ul>")
            res.write("<h5><a href=/>Voltar ao Indice</a></h5>")
            res.end()
        }).catch( erro => {
            console.log("Erro: " + erro)
            res.write("Lista de filmes não encontrada!")
            res.write("<h5><a href=/>Voltar ao Indice</a><h5>")
            res.end()
        });

    }
    else if(q.pathname.startsWith("/filmes/")){

        let idFilme = req.url.split("/")[2]

        axios.get("http://localhost:3000/filmes?idFilme=" + idFilme)
        .then((dados) => {
            let l = dados.data

            res.write("<h1>Filme</h1>")
            res.write("<h2>Informações do Filme: </h2>")

            res.write("<p><b>Titulo: </b>" + l[0].titulo + "</p>");
            res.write("<p><b>Ano: </b>" + l[0].ano + "</p>");
            
            let equipa = l[0].cast

            if (equipa.length === 0){

                res.write("<p><b>Cast: </b>Não possui cast!</p>")

            } else{

                res.write("<p><b>Cast: </b></p>");

                res.write("<ul>")

                for (i in equipa){
                    res.write("<li><a href='/atores/" + equipa[i].idAtor + "'>" + equipa[i].Nome + "</a></li>");
                }

                res.write("</ul>")
            }
            
            let generos = l[0].genres

            if (generos.length === 0){

                res.write("<p><b>Generos: </b>Não possui genero!</p>");

            } else{

                res.write("<p><b>Generos: </b></p>");

                res.write("<ul>")

                for (j in generos){
                    res.write("<li><a href='/generos/" + generos[j].idGenero + "'>" + generos[j].designacao + "</a></li>");
                }

                res.write("</ul>")
            }

            res.write("<h5><a href=/filmes>Voltar ao Indice dos filmes</a></h5>")
            res.end()
        }).catch(erro =>{
            console.log("Erro: " + erro)
            res.write("Filme não encontrado!")
            res.write("<h5><a href=/filmes>Voltar ao Indice dos filmes</a></h5>")
            res.end()
        })

    }
    else if(q.pathname == "/generos"){
        axios.get("http://localhost:3000/generos?_sort=designacao")
        .then((dados) => {

            res.write("<ul>")

            for (i in dados.data){

                res.write("<li><a href='/generos/" + dados.data[i].id + "'>" + dados.data[i].designacao + "</a></li>")
            }
            res.write("</ul>")
            res.write("<h5><a href=/>Voltar ao Indice</a></h5>")
            res.end()
        }).catch( erro => {
            console.log("Erro: " + erro)
            res.write("Lista de generos não encontrada!")
            res.write("<h5><a href=/>Voltar ao Indice</a><h5>")
            res.end()
        });
    }
    else if(q.pathname.startsWith("/generos/")){

        let idGenero = req.url.split("/")[2]

        axios.get("http://localhost:3000/generos?id=" + idGenero)
        .then((dados) => {
            let l = dados.data

            res.write("<h2>" + l[0].designacao + "</h2>")

            res.write("<p><b>Id: </b>" + l[0].id + "</p>");

            res.write("<h3>Lista de Filmes do genero " + l[0].designacao + ": </h3>")

            res.write("<ul>")

            let filmes = l[0].filmes

            for (i in filmes){
                res.write("<li><a href='/filmes/" + filmes[i].idFilme + "'>" + filmes[i].titulo + "</a></li>");
            }

            res.write("</ul>")

            res.write("<h5><a href=/generos>Voltar ao Indice dos generos</a></h5>")
            res.end()
        }).catch(erro =>{
            console.log("Erro: " + erro)
            res.write("Genero não encontrado!")
            res.write("<h5><a href=/generos>Voltar ao Indice dos generos</a></h5>")
            res.end()
        })
        
    }
    else if(q.pathname == "/atores"){
        axios.get("http://localhost:3000/atores?_sort=Nome")
        .then((dados) => {

            res.write("<ul>")

            for (i in dados.data){

                res.write("<li><a href='/atores/" + dados.data[i].id + "'>" + dados.data[i].Nome + "</a></li>")
            }
            res.write("</ul>")
            res.write("<h5><a href=/>Voltar ao Indice</a></h5>")
            res.end()
        }).catch( erro => {
            console.log("Erro: " + erro)
            res.write("Lista de Atores não encontrada!")
            res.write("<h5><a href=/>Voltar ao Indice</a><h5>")
            res.end()
        });
    }
    else if(q.pathname.startsWith("/atores/")){

        let idAtor = req.url.split("/")[2]

        axios.get("http://localhost:3000/atores?id=" + idAtor)
        .then((dados) => {
            let l = dados.data

            res.write("<h2>" + l[0].Nome + "</h2>")

            res.write("<p><b>Id: </b>" + l[0].id + "</p>");

            res.write("<h3>Lista de Filmes em que participou: </h3>")

            res.write("<ul>")

            let filmes = l[0].filmes

            for (i in filmes){
                res.write("<li><a href='/filmes/" + filmes[i].idFilme + "'>" + filmes[i].titulo + "</a></li>");
            }

            res.write("</ul>")

            res.write("<h5><a href=/atores>Voltar ao Indice dos atores</a></h5>")
            res.end()
        }).catch(erro =>{
            console.log("Erro: " + erro)
            res.write("Ator não encontrado!")
            res.write("<h5><a href=/atores>Voltar ao Indice dos generos</a></h5>")
            res.end()
        })
    }
    else{
        res.write("Operação não encontrada!")
        res.write("<h5><a href=/>Voltar ao Indice</a><h5>")
        res.end()
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...");