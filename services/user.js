const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

module.exports = {
    async getUsers() {
        return UserModel.find({});
    },

    async addUser(params) {
        const body = params;

        console.log(body)
        const { password } = body;
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(password, salt);


        return UserModel.create(body);
    }
}