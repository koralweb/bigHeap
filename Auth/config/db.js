const Pool = require('pg').Pool
const config = require('../config')
const pool = new Pool({
    user: 'postgres',
    password: config.dbPassword,
    host: 'localhost',
    port: 5432,
    database: 'crm'
})

module.exports = pool
