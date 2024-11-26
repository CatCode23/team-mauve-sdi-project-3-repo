// knex.js
const knex = require('knex');

const knexConfig = require('./knexfile.js')[process.env.NODE_ENV || 'development'];

module.exports = knex(knexConfig);

