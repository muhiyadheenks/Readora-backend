require('dotenv').config();
const express = require('express');
require('./config/db')
const app = require('./app')
const server = express();
server.use(app)


server.listen(process.env.PORT, () => {
    console.log("Server running on port ", process.env.PORT);

})
