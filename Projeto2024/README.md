# Relatório de Engenharia Web - Plataforma de Gestão de Recursos

## **Autores**
Carlos Filipe Almeida Dias, A93185
Lucas Gabriel Ribeiro Oliveira, A98695
Mike Stephane Melendes Pinto, A89292
Rafael João Ferreira Gomes, A96208

## **Introdução**
Este relatório surge no âmbito da Unidade Curricular de Engenharia Web, em que nos foi proposto a concepção de uma aplicação Web.

A proposta escolhida pelo grupo foi a criação de uma Plataforma Web de consulta de Recursos Online.

**Metodologia**

Para alcançar os objetivos definidos, adotámos uma abordagem estruturada que envolveu várias etapas. Inicialmente, configurámos o ambiente de desenvolvimento utilizando o Docker e o Docker Compose, o que nos permitiu criar um ambiente consistente e facilmente replicável. Posteriormente, passámos para o desenvolvimento da aplicação, que foi dividida em três componentes principais: API, APP e AUTH.

### **Rotas**
API:
Curso
- `GET /`
- `GET /info`
- `GET /:id`
- `POST /`:
- `PUT /:id/recurso`
- `PUT /:id`
- `DELETE /:id`

Noticia
- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

Publicacao
- `GET /`
- `GET /:id`
- `POST /`
- `POST /:id/comentario`
- `PUT /atualiza-nome/:id`
- `PUT /:id`
- `DELETE /:id`

Recurso
- `GET /`
- `GET /info`
- `POST /`
- `GET /tipos`
- `GET /tipos/:id`
- `POST /tipos`
- `PUT /tipos/:id`
- `DELETE /tipos/:id`
- `PUT /classificar/:id`
- `GET /:id`
- `PUT /:id`
- `DELETE /:id`

TipoRecurso
- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`


User
- `GET /:id/favoritos/curso`
- `POST /:id/favoritos/curso`
- `DELETE /:id/favoritos/curso`
- `GET /:id/favoritos/recurso`
- `POST /:id/favoritos/recurso`
- `DELETE /:id/favoritos/recurso`

APP:
Curso
- `GET /`
- `GET /adicionar`
- `POST /adicionar`
- `POST /edit/:id`
- `GET /edit/:id`
- `GET /delete/:id`
- `POST /addFavourite/:id`
- `POST /removeFavourite/:id`
- `GET /:id`

Noticia
- `GET /`
- `GET /adicionar`
- `POST /adicionar`
- `GET /edit/:id`
- `POST /edit/:id`
- `GET /delete/:id`
- `GET /:id`

Publicação
- `GET /`
- `POST /:id/adicionar-comentario`
- `GET /adicionar`
- `GET /edit/:id`
- `POST /edit/:id`
- `GET /delete/:id`
- `GET /:id`

Recurso
- `GET /`
- `GET /consultar/:id`
- `GET /adicionar/:id`
- `GET /fileContents/:fname`
- `GET /download/:fname`
- `POST /adicionar/:id`
- `GET /edit/:id`
- `POST /edit/:id`
- `GET /delelte/:id`
- `POST /classificar/:id`
- `POST /addFavourite/:id`
- `POST /removeFavourite/:id`
- `GET /bloquear/:id`
- `GET /desbloquear/:id`
- `GET /:id`
- `POST /adicionarJson`

AUTH:
- `GET /`
- `POST /login`
- `GET /login/google`
- `GET /login/google/callback`
- `GET /:id`
- `POST /`
- `POST /register`
- `PUT /:id`
- `PUT /:id/password`
- `DELETE /:id`

*Resultados**

Os resultados do projeto foram satisfatórios. A aplicação está completamente funcional, oferecendo todas as funcionalidades planeadas. A utilização do Docker garantiu um ambiente de desenvolvimento estável e fácil de replicar, o que facilitou a colaboração entre os membros da equipa. A documentação foi cuidadosamente elaborada, assegurando que todas as partes interessadas possam compreender e utilizar o sistema de forma eficiente.

**Conclusão**

O Projeto atingiu os objetivos estabelecidos, fornecendo uma aplicação web robusta e escalável. Para o futuro, podemos otimizar ainda mais a performance da aplicação, adicionar novas funcionalidades.
