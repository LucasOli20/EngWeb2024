var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var static = require('./static.js')
var templates = require('./template.js');


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var compositoresServer = http.createServer((req, res) => {

    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.isStaticResource(req)) {
        static.serverStaticResources(req, res)
    } else {
        switch(req.method){
            case "GET":
                // GET /compositores
                if(req.url == "/" || req.url == "/compositores"){
                    axios.get("http://localhost:3000/compositores?_sort=nome")
                        .then(resp => {
                            compositores = resp.data
                        
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.paginaListaCompositores(compositores, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(501, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter a lista de compositores: " + erro + "</p>")
                            res.end()
                        })
                } else if (/^(\/compositores)\/(.+?)$/.test(req.url)) {
                    id = req.url.split("/").pop()
                    axios.get("http://localhost:3000/compositores/" + id)
                        .then(resp => {
                            compositor = resp.data
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.paginaCompositor(compositor, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(502, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter o compositor: " + erro + "</p>")
                            res.end()
                        })
                } else if (/^(\/edit)\/compositores\/(C\d+)$/.test(req.url)) {
                    id = req.url.split("/").pop()
                    axios.get("http://localhost:3000/compositores/" + id)
                        .then(resp => {
                            compositor = resp.data
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.paginaEditCompositor(compositor, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter o compositor: " + erro + "</p>")
                            res.end()
                        })
                } else if (/^(\/delete)\/compositores\/(C\d+)$/.test(req.url)) {
                    id = req.url.split("/").pop()
                    axios.delete("http://localhost:3000/compositores/" + id)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Compositor: " + id + " Removido com sucesso!</p>")
                            res.write('<p><a href="/compositores" class="w3-button w3-round w3-grey"><b>Voltar para a lista de Compositores</b></a></p>')

                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(504, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel Eliminar o compositor: " + erro + "</p>")
                            res.end()
                        })
                } else if(req.url == "/registo/compositores") {
                    axios.get("http://localhost:3000/periodos")
                        .then(resp => {
                            periodos = resp.data
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.paginaRegistoCompositores(periodos, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(505, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel ir para a pagina de registo do compositor: " + erro + "</p>")
                            res.end()
                        })

                // Periodos        
                } else if(req.url == "/periodos") {
                    axios.get("http://localhost:3000/periodos?_sort=designacao")
                        .then(resp => {
                            listaPeriodos = resp.data
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.paginaListaPeriodos(listaPeriodos, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(506, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter a lista de periodos: " + erro + "</p>")
                            res.end()
                        }) 
                } else if(/^(\/periodos)\/(.+?)$/.test(req.url)) {
                    id = req.url.split("/").pop()
                    axios.get("http://localhost:3000/periodos?designacao=" + id)
                        .then(resp => {
                            periodo = resp.data
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.paginaPeriodo(periodo, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(507, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel obter o periodo: " + erro + "</p>")
                            res.end()
                        }) 
                } else if(/^(\/edit)\/periodos\/(.+?)$/.test(req.url)) {
                    id = req.url.split("/").pop()
                    axios.get("http://localhost:3000/periodos/" + id)
                        .then(resp => {
                            periodo = resp.data
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.paginaEditPeriodo(periodo, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(508, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a informação do periodo: " + erro + "</p>")
                            res.end()
                        }) 
                } else if(/^(\/delete)\/periodos\/(.+?)$/.test(req.url)) {
                    id = req.url.split("/").pop()
                    axios.delete("http://localhost:3000/periodos/" + id)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Periodo: " + id + " Removido com sucesso!</p>")
                            res.write('<p><a href="/periodos" class="w3-button w3-round w3-grey"><b>Voltar para a lista de Periodos</b></a></p>')
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(509, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel eliminar o periodo: " + erro + "</p>")
                            res.end()
                        }) 
                }else if(req.url == '/registo/periodos') {
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write(templates.paginaRegistoPeriodo(d))
                    res.end()
                } else {
                    res.writeHead(510, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>ERRO: Método não suportado!</p>")
                    res.end()
                }
                break

            case "POST":
                if(req.url == '/registo/compositores') {
                        collectRequestBodyData(req, result => {
                            if(result) {
                                axios.post("http://localhost:3000/compositores", result)
                                .then(resp => {
                                    res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                                    res.write("<p>Compositor registado com sucesso!</p>")
                                    res.write('<p><a href="/" class="w3-button w3-round w3-grey"><b>Voltar para a lista de Compositores</b></a></p>')
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(511, {'Content-Type' : 'text/html; charset=utf-8'})
                                    res.write("<p>Não foi possível registar o Compositor! - " + erro + "</p>")
                                    res.end()
                                })
                            }
                            else
                            {
                                res.writeHead(511, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write("<p>Não foi possivel coletar os dados do body...</p>")
                                res.end()
                            }
                        })
                } else if(req.url == '/registo/periodos') {
                    collectRequestBodyData(req, result => {
                        if(result) {
                            axios.get("http://localhost:3000/periodos")
                                .then(resp => {
                                    periodos = resp.data
                                    let novoId = "p" + (periodos.length + 1).toString();
                                    result.id = novoId;
                                    axios.post("http://localhost:3000/periodos", result)
                                        .then(resp => {
                                            res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                                            res.write("<p>Periodo registado com sucesso!</p>")
                                            res.write('<p><a href="/periodos" class="w3-button w3-round w3-grey"><b>Voltar para a lista de Periodos</b></a></p>')
                                            res.end()
                                        })
                                        .catch(erro => {
                                            res.writeHead(512, {'Content-Type' : 'text/html; charset=utf-8'})
                                            res.write("<p>Não foi possível registar o Periodo! - " + erro + "</p>")
                                            res.end()
                                        })
                                })
                                .catch(erro => {
                                    res.writeHead(512, {'Content-Type' : 'text/html; charset=utf-8'})
                                    res.write("<p>Não foi possivel obter a lista de periodos: " + erro + "</p>")
                                    res.end()
                                })
                        }
                        else
                        {
                            res.writeHead(513, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel coletar os dados do body...</p>")
                            res.end()
                        }
                    })
                } else if(/^(\/edit)\/periodos\/(p\d+?)$/.test(req.url)) {
                    collectRequestBodyData(req, result => {
                        if(result) {
                            axios.put("http://localhost:3000/periodos/" + result.id, result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write("<p>Periodo editado com sucesso!</p>")
                                res.write(`<p><a href="/periodos/${result.designacao}" class="w3-button w3-round w3-grey"><b>Voltar para a pagina do Periodo</b></a></p>`)

                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(514, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write("<p>Não foi possível editar o Periodo! - " + erro + "</p>")
                                res.end()
                            }) 
                        }
                        else
                        {
                            res.writeHead(513, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel coletar os dados do body...</p>")
                            res.end()
                        }
                    })
                } else if(/^(\/edit)\/compositores\/(.+?)$/.test(req.url)) {
                    collectRequestBodyData(req, result => {
                        if(result) {
                            axios.put("http://localhost:3000/compositores/" + result.id, result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write("<p>Compositor editado com sucesso!</p>")
                                res.write(`<p><a href="/compositores/${result.id}" class="w3-button w3-round w3-grey"><b>Voltar para a pagina do Compositor</b></a></p>`)

                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(515, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write("<p>Não foi possível editar o Compositor! - " + erro + "</p>")
                                res.end()
                            }) 
                        }
                        else
                        {
                            res.writeHead(516, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possivel coletar os dados do body...</p>")
                            res.end()
                        }
                    })
                } else
                {
                    res.writeHead(517, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>ERRO: Método não suportado! -  " + erro + "</p>")
                    res.end()
                }
                break
            default:
                res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
                res.write("<p>ERRO: Método não suportado! -  " + req.method + "</p>")
                res.end()
                break
        }
    }
})

compositoresServer.listen(7777, () => {
    console.log("Servidor à escuta na porta 7777...")
})
