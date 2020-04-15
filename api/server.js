const express = require("express");
const accountsRouter = require('./accountsRouter');
const db = require("../data/dbConfig.js");
const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
    res.status(200).json({
        message : 'Server is running on port 5000'
    })
})

module.exports = server;
