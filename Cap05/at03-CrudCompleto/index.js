import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as bd from './bd.js'

const app = express()
const PORT = process.env.PORT || 3200
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const baseDir = path.join(__dirname, 'templates')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Páginas
app.get('/', (req, res) => res.sendFile(path.join(baseDir, 'index.html')))
app.get('/cadastrar', (req, res) => res.sendFile(path.join(baseDir, 'cadastrar.html')))

// API Genérica
app.post('/cadastrar/:tabela', async (req, res) => {
  try { res.status(201).json(await bd.inserir(req.params.tabela, req.body)) }
  catch (e) { res.status(400).json({ erro: e.message }) }
})

app.get('/consultar/:tabela/:id?', async (req, res) => {
  try { res.json(await bd.ler(req.params.tabela, req.params.id)) }
  catch (e) { res.status(400).json({ erro: e.message }) }
})

app.put('/editar/:tabela/:id', async (req, res) => {
  try { res.json(await bd.atualizar(req.params.tabela, req.body, req.params.id)) }
  catch (e) { res.status(400).json({ erro: e.message }) }
})

app.delete('/excluir/:tabela/:id', async (req, res) => {
  try { res.json(await bd.deletar(req.params.tabela, req.params.id)) }
  catch (e) { res.status(400).json({ erro: e.message }) }
})

app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`))