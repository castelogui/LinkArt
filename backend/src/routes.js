const express = require('express');

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/users', UserController.all);
routes.get('/profile/:username', UserController.index);
routes.put('/profile/:username', UserController.update);
routes.post('/register', UserController.create);
routes.post('/logon', SessionController.index);

routes.get('/feed', PostController.index);
routes.get('/feed/:username/:id', PostController.detail);
routes.post('/profile/:username/post', PostController.create);

module.exports = routes;
