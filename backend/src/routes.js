const express = require('express');

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/*Routes for UserController*/ 
routes.get('/', UserController.all);
routes.get('/user/:username', UserController.index);
routes.put('/user/:username', UserController.update);
routes.post('/register', UserController.create);

/*Routes for PostController*/
routes.get('/post/:id', PostController.onePost);
routes.get('/post', PostController.index);
routes.get('/post/:username/:id', PostController.detail);
routes.post('/post/:username', PostController.create);
routes.put('/post/:username/:id', PostController.update);
routes.delete('/post/:username/:id', PostController.delete);

routes.post('/logon', SessionController.index);

module.exports = routes;
