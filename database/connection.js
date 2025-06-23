var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '',
      database : 'db_apiusers',
      timezone: 'America/Sao_Paulo',
      dateStrings: true
    }
  });

module.exports = knex

// conexão com o banco de dados usando knex