import express from 'express'

const app = express()
const PORT = process.env.PORT || 3200

// Parâmetros opcionais são definidos com '?' Exemplo: /bemvindo/:nome?
app.get('/bemvindo/:nome?', (req, res) => {
    const { nome } = req.params // Destructuring para extrair o parâmetro
    nome = nome? nome:''
    res.send(`<h1>Olá ${nome}, seja bem-vindo!</h1>`)
})

app.listen(PORT, ()=>console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`))