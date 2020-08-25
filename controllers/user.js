const _ = require('lodash');
const UserService = require('../services/user');

module.exports = {

    // Get all users
    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            res.json({
                data: users,
                message: 'Record(s)successfully fetched'
            })
        } catch (e) {
            console.log('Unable to fetch user', e);
        }
    },

    async createUser(req, res) {
        try {
            const users = await UserService.addUser(req.body);
            res.json({
                data: _.pick(users, ['_id', 'firstName', 'lastName', 'email']),
                message: 'user successfully created'
            })
        } catch (e) {
            console.log('Unable to fetch user', e);
        }
    }
}