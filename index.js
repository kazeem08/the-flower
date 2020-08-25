require('./init');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const config = require('./config');
const responseManager = require('./lib/response_manager_middleware');
const auth = require('./lib/auth');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(auth);
app.use(responseManager);

app.get('/', async (req, res) => {
    res.send(`Welcome to ${config.name}`)
});

require('./routes')(app);

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

module.exports = app;