const Pool = require("pg").Pool

const pool = new Pool({
    user: 'samir',
    host: 'localhost',
    password: 'iamhappy12',
    port: 5432,
    database: 'pern'
}
)

module.exports = pool;