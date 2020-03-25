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


app.listen(3333);

