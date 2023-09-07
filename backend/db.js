const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'Migue1andm4rc1!',
  host: 'localhost',
  port: 5432,
  database: 'edmeventfinder'
});

module.exports = pool;