const express = require('express');
const router = express.Router();
const knex = require('../../../src/server/db/knex');

const indexController = require('../controllers/appupload');

router.get('/', function (req, res, next) {
    res.write('hello world');
    res.end();
});

module.exports = router;