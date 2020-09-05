require('dotenv').config();

const { APP_NAME, PORT, MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, SECRET_KEY } = process.env;

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/flower?retryWrites=true&w=majority`;
// const url = `mongodb://localhost/flower`;

const firstLevel = '#6b2f00';
const secondLevel = '#b87f53';
const thirdLevel = "#18A2B8";
const fourthLevel = secondLevel;
module.exports = {
    name: APP_NAME,
    port: PORT,
    secretKey: SECRET_KEY,
    databases: {
        mongodb: {
            host: MONGO_HOST,
            port: MONGO_PORT,
            url,
        }
    },
    template: {
        "flower": {
            "name": "",
            "color": firstLevel,
            "children": [
                {
                    "name": "",
                    "color": secondLevel,
                    "children": [
                        {
                            "name": "",
                            "color": thirdLevel,
                            "children": [
                                {
                                    "name": "",
                                    "color": fourthLevel,
                                    "value": 1000
                                },
                                {
                                    "name": "",
                                    "color": fourthLevel,
                                    "value": 1000
                                }
                            ]
                        },
                        {
                            "name": "",
                            "color": thirdLevel,
                            "children": [
                                {
                                    "name": "",
                                    "color": fourthLevel,
                                    "value": 1000
                                },
                                {
                                    "name": "",
                                    "color": fourthLevel,
                                    "value": 1000
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "",
                    "color": secondLevel,
                    "children": [
                        {
                            "name": "",
                            "color": thirdLevel,
                            "children": [
                                {
                                    "name": "",
                                    "color": fourthLevel,
                                    "value": 1000
                                },
                                {
                                    "name": "",
                                    "color": fourthLevel,
                                    "value": 1000
                                }
                            ]
                        },
                        {
                            "name": "",
                            "color": thirdLevel,
                            "children": [
                                {
                                    "name": "",
                                    "color": fourthLevel,
                                    "value": 1000
                                },
                                {
                                    "name": "",
                                    "color": fourthLevel,
                                    "value": 1000
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}