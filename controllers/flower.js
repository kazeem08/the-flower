const FlowerService = require("../services/flower");

module.exports = {
    async getFlowers(req, res) {
        const flowers = await FlowerService.getFlowers(req.query);

        res.successResponse({
            data: flowers,
            message: 'flowers successfully fetched'
        })
    },

    async addNamesToFlower(req, res) {
        const flowers = await FlowerService.addNames(req.body);

        res.successResponse({
            data: flowers,
            message: 'flowers successfully updated'
        })
    }
}