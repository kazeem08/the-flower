const UserService = require('../services/user');

module.exports = {

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
    }
}