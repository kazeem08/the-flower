const mongoose = require('mongoose');
// const { init } = require('.');

const config = require('../config')

module.exports = {
    async init() {
        const connectionStatus = await mongoose.connect(config.databases.mongodb.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (connectionStatus) {
            console.log('connected to mongodb successfully');
        }
    }
}