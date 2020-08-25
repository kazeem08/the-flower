require('dotenv').config();

const { APP_NAME, PORT, MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, SECRET_KEY } = process.env;

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/flower?retryWrites=true&w=majority`
module.exports = {
    name: APP_NAME,
    port: PORT,
    secretKey: SECRET_KEY,
    databases: {
        mongodb: {
            host: MONGO_HOST,
            port: MONGO_PORT,
            // url: `mongodb://${MONGO_HOST}/flower`,
            url,
        }
    }
}