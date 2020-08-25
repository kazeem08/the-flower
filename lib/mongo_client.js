const mongoose = require('mongoose');

const config = require('../config')

module.exports = {
    async init() {
        const connectionStatus = await mongoose.connect(config.databases.mongodb.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        if (connectionStatus) {
            console.log('connected to mongodb successfully');
        }
    }
}

