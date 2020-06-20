const express = require('express');

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

const routes = express.Router();

routes.get('/users', UserController.all);
routes.get('/profile/:username', UserController.index);
routes.post('/register', UserController.create);
routes.post('/logon', UserController.logon);

routes.get('/feed', PostController.index);

module.exports = routes;
