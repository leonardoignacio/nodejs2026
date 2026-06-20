import bcrypt from 'bcrypt'
import prisma from '../config/database.js'

export const listar = async (req, res) => {
  try {
    const { tabela } = req.params
    let queryArgs = {}

    // REGRA 1: Filtra para exibir apenas os pets do usuário autenticado
    if (tabela === 'pet' && req.usuarioId) {
      queryArgs.where = { id_cli: req.usuarioId }
    }

    const dados = await prisma[tabela].findMany(queryArgs)
    res.status(200).json(dados)
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}

export const criar = async (req, res) => {
  try {
    const { tabela } = req.params
    const dados = req.body

    // REGRA 2: Injeção Automática do Dono
    if (tabela === 'pet' && req.usuarioId) {
      dados.id_cli = req.usuarioId
    }

    // REGRA DE SEGURANÇA: Criptografia de Senha
    if (tabela === 'usuario' && dados.senha) {
      const salt = await bcrypt.genSalt(10)
      dados.senha = await bcrypt.hash(dados.senha, salt)
    }

    const novo = await prisma[tabela].create({ data: dados })
    
    // Removemos a senha do objeto de retorno por segurança, para não vazar o hash no front-end
    if (tabela === 'usuario') {
      delete novo.senha
    }

    res.status(201).json(novo)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}

export const atualizar = async (req, res) => {
  try {
    const { tabela, id } = req.params
    
    // REGRA 3: Trava de Posse para Atualização
    if (tabela === 'pet' && req.usuarioId) {
      const pet = await prisma.pet.findUnique({ where: { id: Number(id) } })
      if (!pet || pet.id_cli !== req.usuarioId) {
        return res.status(403).json({ erro: 'Acesso negado. Este pet não pertence a você.' })
      }
    }

    // Se houver atualização de senha, criptografa novamente
    if (tabela === 'usuario' && req.body.senha) {
      const salt = await bcrypt.genSalt(10)
      req.body.senha = await bcrypt.hash(req.body.senha, salt)
    }

    const atualizado = await prisma[tabela].update({
      where: { id: Number(id) },
      data: req.body
    })
    
    if (tabela === 'usuario') delete atualizado.senha

    res.status(200).json(atualizado)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}

export const remover = async (req, res) => {
  try {
    const { tabela, id } = req.params
    
    // REGRA 4: Trava de Posse para Exclusão
    if (tabela === 'pet' && req.usuarioId) {
      const pet = await prisma.pet.findUnique({ where: { id: Number(id) } })
      if (!pet || pet.id_cli !== req.usuarioId) {
        return res.status(403).json({ erro: 'Acesso negado. Você não pode excluir este pet.' })
      }
    }

    await prisma[tabela].delete({ where: { id: Number(id) } })
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}