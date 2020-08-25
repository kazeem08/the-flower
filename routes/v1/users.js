const express = require('express');
const route = express.Router();

const UserController = require('../../controllers/user');

route.get('/', (req, res) => UserController.getUsers(req, res));

module.exports = route;

