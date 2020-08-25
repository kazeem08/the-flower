const UserModel = require('../models/user');

module.exports = {
    async getUsers() {
        return UserModel.find({});
    }
}