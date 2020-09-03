const _ = require('lodash');
const UserService = require('../services/user');
const UserModel = require('../models/user');

module.exports = {

    // login 
    async login(req, res) {
        const user = await UserService.login(req.body);

        if (user) {
            return res.successResponse({
                data: _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'token', 'role']),
                message: 'Record(s)successfully fetched'
            });
        }

        return res.errorResponse({
            message: 'Invalid username/password',
            statusCode: 400,
        });
    },

    // Get all users
    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            return res.successResponse({
                data: users,
                message: 'Record(s)successfully fetched'
            });
        } catch (e) {
            console.log('Unable to fetch user', e);
        }
    },

    // create user
    async createUser(req, res) {
        try {
            const { _id } = req.user;
            console.log(_id)
            const { role } = await UserModel.findById(_id);
            if (role !== 'superAdmin') {
                return res.errorResponse({
                    message: 'Only super admin can create user',
                    statusCode: 401,
                });
            }
            const users = await UserService.addUser(req.body);
            res.successResponse({
                data: _.pick(users, ['_id', 'firstName', 'lastName', 'email']),
                message: 'user successfully created'
            })
        } catch (e) {
            console.log('Unable to fetch user', e);
        }
    },

    // create user
    async updateUser(req, res) {
        try {
            if (req.body.email) {
                return res.errorResponse({
                    message: 'You cannot update your email',
                    statusCode: 400,
                });
            }
            const users = await UserService.update(req.body);
            res.json({
                data: users,
                message: 'user successfully updated'
            })
        } catch (e) {
            console.log('Unable to fetch user', e);
        }
    }
}