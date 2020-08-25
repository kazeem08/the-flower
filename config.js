require('dotenv').config();

const { APP_NAME, PORT, MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT } = process.env;
module.exports = {
    name: APP_NAME,
    port: PORT,
    databases: {
        mongodb: {
            username: MONGO_USERNAME,
            password: MONGO_PASSWORD,
            host: MONGO_HOST,
            port: MONGO_PORT,
            url: `mongodb://${MONGO_HOST}/flower`,
        }
    }
}