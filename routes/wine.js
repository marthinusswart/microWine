"use strict";
var express = require('express');
var wineMongoDBService = require('../services/wineMongoDBService');
var router = express.Router();
var wineDBService = new wineMongoDBService.WineMongoDBService();
router.get('/', function (req, res, next) {
    wineDBService.init();
    wineDBService.find(function (err, wines) {
        res.status(200).send(wines);
    });
});
module.exports = router;
//# sourceMappingURL=wine.js.map