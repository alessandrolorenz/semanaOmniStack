const express = require('express');

const routes = express.Router();

routes.post('/users', (req, res) => {
  let teste = req.body

  return res.json({
    teste: teste,
    evento: 'Semana CodarBemLoco',
    aluno: 'Alessandro Lorenz'
  });
});

module.exports = routes;