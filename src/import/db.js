const sql = require('mssql')
const { dockerDbConfig } = require('../config')
let pool = null;

exports.connectDb = async () => {
  try {
    if (pool) {
      return pool
    }
    pool = await sql.connect(dockerDbConfig)
    pool.on('error', async err => {
      console.log(err)
      await closePool()
    })
    return pool
  } catch (err) {
    console.log(err)
    pool = null
  }
}

exports.disconnectDb = async () => {
  try {
    await pool.close()
    pool = null
  } catch (err) {
    pool = null
    console.log(err)
  }
}