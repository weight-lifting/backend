const knex = require("knex");

const knexConfig = require("../knexfile");
const enviroment = process.env.DB_ENV || 'development';

console.log('db env',enviroment)

module.exports = knex(knexConfig[enviroment]);
