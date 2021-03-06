const express = require('express');
const route = express.Router();

const UserController = require('../../controllers/user');

route.get('/', (req, res) => UserController.getUsers(req, res));

route.post('/', (req, res) => UserController.createUser(req, res));

route.post('/login', (req, res) => UserController.login(req, res));

route.put('/:id', (req, res) => UserController.updateUser(req, res));

route.delete('/:id', (req, res) => UserController.deleteUser(req, res));


module.exports = route;

