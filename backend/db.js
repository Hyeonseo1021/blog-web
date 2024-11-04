const Pool = require("pg").Pool;

const pool = new Pool({
    user: "root",
    password: "1534",
    host: "localhost",
    port: 5432,
    database: "blog"
});

module.exports = pool;