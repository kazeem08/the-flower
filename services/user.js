const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const config = require('../config');

module.exports = {
    async getUsers() {
        return UserModel.find({}).select("-password");
    },

    async addUser(params) {
        const body = params;

        const { password } = body;

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(password, salt);

        return UserModel.create(body);
    },

    async login(params) {
        const body = params;

        const { email, password } = body;

        // check if user exist
        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) return;
        // encrypt password


        // compare passwords
        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) return;

        // create token
        const token = jwt.sign({ _id: user._id, role: user.role }, config.secretKey);

        user.token = token;

        return user;
    },

    async update(params) {
        const body = params;
        const { password, id } = body;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(password, salt);
        };

        const doc = {
            "$set": body,
        }
        delete body._id;
        return UserModel.findOneAndUpdate(id, doc, { new: true });


    }
}