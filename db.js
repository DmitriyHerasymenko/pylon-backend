const Pool = require('pg').Pool
const pool = new Pool ({
    user: 'dmytroherasymenko',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'pylon'
});

module.exports = pool