import mysql from 'mysql2/promise'

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'senac',
  database: process.env.DB_NAME || 'amigo_do_pet'
}

let conexao = null

const conectar = async () => {
  if (!conexao) {
    conexao = await mysql.createConnection(config)
    console.log('🚀 Conectado ao Banco')
  }
  return conexao
}

const obterCampos = async (tabela) => {
  const con = await conectar()
  try {
    const [campos] = await con.query(`DESCRIBE ${tabela}`)
    return campos.map(c => c.Field)
  } catch (e) { throw new Error(`Tabela ${tabela} inválida: ${e.message}`) }
}

export const inserir = async (tabela, dados) => {
  const camposArr = await obterCampos(tabela)
  const campos = camposArr.slice(1).join(',') // Remove ID
  const placeholders = camposArr.slice(1).map(() => '?').join(',')
  const sql = `INSERT INTO ${tabela} (${campos}) VALUES (${placeholders})`
  const con = await conectar()
  const [res] = await con.execute(sql, Object.values(dados))
  return { id: res.insertId, status: 201 }
}

export const ler = async (tabela, id = '') => {
  const sql = id ? `SELECT * FROM ${tabela} WHERE id = ?` : `SELECT * FROM ${tabela}`
  const con = await conectar()
  const [rows] = await con.execute(sql, id ? [id] : [])
  return rows.length ? rows : { msg: 'Nenhum registro' }
}

export const atualizar = async (tabela, dados, id) => {
  const camposArr = await obterCampos(tabela)
  const setClause = camposArr.slice(1).map(c => `${c}=?`).join(',')
  const sql = `UPDATE ${tabela} SET ${setClause} WHERE id = ?`
  const con = await conectar()
  const [res] = await con.execute(sql, [...Object.values(dados), id])
  return { atualizado: !!res.affectedRows }
}

export const deletar = async (tabela, id) => {
  const con = await conectar()
  const [res] = await con.execute(`DELETE FROM ${tabela} WHERE id = ?`, [id])
  return { excluido: !!res.affectedRows }
}