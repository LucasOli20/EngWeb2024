var http = require('http');
var url = require('url');
var axios = require('axios')

http.createServer((req, res) => {
    console.log(req.method + " " + req.url);

    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})

    var q = url.parse(req.url, true)

    console.log("Pedido: " + req.url)

    if(q.pathname == '/'){

        res.write("<h1>Escola da Música</h1>")
        res.write("<h2>Escolha uma das Opções: </h2>")
        res.write("<ul>")
        res.write("<li><a href=/alunos>alunos</a></li>")
        res.write("<li><a href=/cursos>cursos</a></li>")
        res.write("<li><a href=/instrumentos>instrumentos</a></li>")
        res.write("</ul>")
        res.end()
        
    }else if(q.pathname == "/alunos"){

        axios.get("http://localhost:3000/alunos?_sort=nome")
        .then( (resp) => {
            let lista = resp.data

            res.write("<h1>Escola da Música</h1>")
            res.write("<h2>Lista de Alunos: </h2>")
            res.write("<ul>")
            for(i in lista){
                res.write("<li><a href='/alunos/" + lista[i].id + "'>" + lista[i].nome + "</a></li>")
            }
            res.write("</ul>")
            res.write("<h5><a href=/>Voltar ao Indice</a></h5>")
            res.end()

        }).catch( erro =>{
            console.log("Erro: " + erro)
            res.write("Lista de alunos não encontrada!")
            res.write("<h5><a href=/>Voltar ao Indice</a></h5>")
            res.end()
        });
        
    }else if (q.pathname.startsWith("/alunos/")){
        
        let idAluno = req.url.split("/")[2]

        axios.get("http://localhost:3000/alunos?id=" + idAluno)
        .then((resp) => {
            let l = resp.data;

            res.write("<h1>Escola da Música</h1>")
            res.write("<h2>Informações do Aluno: </h2>")

            res.write("<p><b>Nome: </b>" + l[0].nome + "</p>");
            res.write("<p><b>ID: </b>" + l[0].id + "</p>");
            res.write("<p><b>Data de Nascimento: </b>" + l[0].dataNasc + "</p>");
            res.write("<p><b>Curso: </b><a href='/cursos/" + l[0].curso + "'>" + l[0].curso + "</a>");
            res.write("<p><b>Ano do curso: </b>" + l[0].anoCurso + "</p>");
            res.write("<p><b>Instrumento: </b><a href='/instrumentos/" + l[0].instrumento + "'>" + l[0].instrumento + "</a>");

            res.write("<h5><a href=/alunos>Voltar ao Indice dos alunos</a></h5>")
            res.end()

        }).catch(erro =>{
            console.log("Erro: " + erro)
            res.write("Aluno não encontrado!")
            res.write("<h5><a href=/alunos>Voltar ao Indice dos alunos</a></h5>")
            res.end()
        });

    } else if(q.pathname == "/cursos"){

        axios.get("http://localhost:3000/cursos?_sort=designacao")
        .then( (resp) => {
            let lista = resp.data

            res.write("<h1>Escola da Música</h1>")
            res.write("<h2>Lista de Cursos: </h2>")

            res.write("<ul>")
            for(i in lista){
                res.write("<li><a href='/cursos/" + lista[i].id + "'>" + lista[i].designacao + "</a></li>")
            }
            res.write("</ul>")
            res.write("<h5><a href=/>Voltar ao Indice</a></h5>")
            res.end()

        }).catch( erro =>{
            console.log("Erro: " + erro)
            res.write("Lista de cursos não encontrada!")
            res.write("<h5><a href=/>Voltar ao Indice</a></h5>")
            res.end()
        });

    } else if(q.pathname.startsWith("/cursos/")){

        let idCurso = req.url.split("/")[2]

        axios.get("http://localhost:3000/cursos?id=" + idCurso)
        .then((resp) => {
            let l = resp.data;

            res.write("<h1>Escola da Música</h1>")
            res.write("<h2>Informações do Curso: </h2>")

            res.write("<p><b>Id do Curso: </b>" + l[0].id + "</p>");
            res.write("<p><b>Designacao: </b>" + l[0].designacao + "</p>");
            res.write("<p><b>Duracao: </b>" + l[0].duracao + "</p>");
            res.write("<p><b>Instrumento: </b><a href='/instrumentos/" + l[0].instrumento["#text"] + "'>" + l[0].instrumento["#text"] + "</a>");
            
            res.write("<h5><a href=/cursos>Voltar ao Indice dos cursos</a></h5>")
            res.end()

        }).catch(erro =>{
            console.log("Erro: " + erro)
            res.write("Curso não encontrado!")
            res.write("<h5><a href=/cursos>Voltar ao Indice dos cursos</a></h5>")
            res.end()
        });

    } else if(q.pathname == "/instrumentos"){

        axios.get("http://localhost:3000/instrumentos?_sort=%23text")
        .then( (resp) => {
            let lista = resp.data

            res.write("<h1>Escola da Música</h1>")
            res.write("<h2>Lista de Instrumentos: </h2>")

            res.write("<ul>")
            for(i in lista){
                res.write("<li><a href='/instrumentos/" + lista[i]["#text"] + "'>" + lista[i]["#text"] + "</a></li>")
            }
            res.write("</ul>")
            res.write("<h5><a href=/>Voltar ao Indice</a></h5>")
            res.end()

        }).catch( erro =>{
            console.log("Erro: " + erro)
            res.write("Lista de instrumentos não encontrada!")
            res.write("<h5><a href=/>Voltar ao Indice</a></h5>")
            res.end()
        });

    } else if(q.pathname.startsWith("/instrumentos/")){

        let idInstrumento = req.url.split("/")[2]

        axios.get("http://localhost:3000/instrumentos?%23text=" + idInstrumento)
        .then((resp) => {
            let l = resp.data;

            res.write("<h1>Escola da Música</h1>")
            res.write("<h2>Informações do Instrumento: </h2>")

            res.write("<p><b>Id Instrumento: </b>" + l[0].id + "</p>");
            res.write("<p><b>Designacao: </b>" + l[0]["#text"] + "</p>");
            
            res.write("<h5><a href=/instrumentos>Voltar ao Indice dos instrumentos</a></h5>")
            res.end()

        }).catch(erro =>{
            console.log("Erro: " + erro)
            res.write("Instrumento não encontrado")
            res.write("<h5><a href=/instrumentos>Voltar ao Indice dos instrumentos</a></h5>")
            res.end()
        });
        
    } else{
        res.write("Operação não encontrada")
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...");