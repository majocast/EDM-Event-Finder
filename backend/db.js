const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  password: process.env.LOCALDBPASS,
  host: 'localhost',
  port: 5432,
  database: 'edmeventfinder',
  //comment back in for production build
  /*
  ssl: {
    rejectedUnauthorized: false,
  },
  */
});

/*
user: process.env.USERNAME,
password: process.env.PASSWORD,
host: process.env.HOST,
port: process.env.DBPORT,
database: process.env.DATABASE,

user: 'postgres',
password: process.env.LOCALDBPASS,
host: 'localhost',
port: 5432,
database: 'edmeventfinder',
*/

module.exports = pool;