const express = require('express')
var app = express()
var porta = '3200'

app.get('/', function (req, res){
    res.send('<h1>Tena inicial</h1><p>Olá Mundo</p>')
})
app.get('/cadastro', function (req, res){
    res.send('<h1>Tela de cadastro</h1>')
})

app.get('/usuario', function (req, res){
    res.send('<h1>Tela de usuário</h1>')
})

app.get('/consulta', function (req, res){
    res.send('<h1>Tela de consulta</h1>')
})

app.listen(porta, function(){
    console.log(`Servidor rodando em: http://localhost:${porta}`)
})
