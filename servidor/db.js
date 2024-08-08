const mysql = require('mysql2/promise')

const {DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT} = require("./config.js")

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;