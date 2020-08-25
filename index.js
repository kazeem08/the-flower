require('./init');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const config = require('./config');
console.log(config)

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.send(`Welcome to ${config.name}`)
});

require('./routes')(app);

app.listen(3000, () => {
    console.log(`listening on port ${config.port}`)
})

module.exports = app;