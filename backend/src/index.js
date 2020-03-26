const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

/**
 * tipos de parametros
 * Query: (acessa pelo .query) /user?name=Diego ou /user?page=2&nome=Pedro  - para filtros, paginação etc
 * Route: (acessa pelo .params) /user/:id - usados pra identificar recursos (unico) nao nomeados
 * Body: Corpo da requisicao - criar ou alterar
 */

 /**
  * npm install knex --save
  * npm install sqlite3 --save
  * npx knex init
  * npx knex migrate:make create_ongs
  * Set the `useNullAsDefault` flag to hide this warning.
  * configura a migrate e : npx knex migrate:latest
  * desfazer a ultima migrate: npx knex migrate:rollback
  * npx knex migrate:status
  * caso nao crie pode-se deletardb.sqlite e executar de novo npx knex migrate:latest
  * 
  */


app.listen(3333);

