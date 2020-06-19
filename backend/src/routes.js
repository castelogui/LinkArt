const express = require('express');

const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.all);
routes.get('/profile/:username', UserController.index);
routes.post('/register', UserController.create);

module.exports = routes;
