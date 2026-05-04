import { Client, Pool } from 'pg'

const user = process.env.USER_PG
const host = process.env.HOST_PG
const password = process.env.PASSWORD_PG
const database = process.env.DATABASE_PG

if(!user || user === ''){
  throw new Error("É necessario informar as credenciais do postgres  ")
}
if(!host || host === ''){
  throw new Error("É necessario informar as credenciais do postgres  ")
}
if(!password || password === ''){
  throw new Error("É necessario informar as credenciais do postgres ")
}

if(!database || database === ''){
  throw new Error("É necessario informar as credenciais do postgres ")
}


export const pgClient = new Pool({
  host: host,
  user:  user,
  password: password, 
  database: database,
})

 