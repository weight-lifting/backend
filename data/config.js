const knex = require("knex");

const knexConfig = require("../knexfile");
const environment = process.env.DB_ENV || "development";

console.log("db env", environment);

module.exports = knex(knexConfig[environment]);
