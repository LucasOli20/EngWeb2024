var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var mongoDB = 'mongodb://127.0.0.1:27017/tpc6'
mongoose.connect(mongoDB)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Erro na conexão ao MongoDB'))
db.once('open', () => {
    console.log("Conexão ao MongoDB realizada com sucesso!")
})

var compositoresRouter = require('./routes/compositores');
var periodosRouter = require('./routes/periodos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/compositores', compositoresRouter);
app.use('/periodos', periodosRouter);

module.exports = app;
