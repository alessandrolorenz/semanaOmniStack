const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate')

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionsController = require('./controllers/SessionsController');
// const crypto = require('crypto'); //vai para o controller tb

// const connection = require('./database/connection'); // conexão com o bd -vai para o controller

const routes = express.Router();


routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().length(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),


  })
}), OngController.create);

routes.post('/sessions', SessionsController.create);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}),IncidentController.delete);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

module.exports = routes;