"use strict";
var express = require('express');
var wineMongoDBService = require('../services/wineMongoDBService');
var router = express.Router();
var wineDBService = new wineMongoDBService.WineMongoDBService();
router
    .get('/', function (req, res, next) {
    wineDBService.init();
    wineDBService.find(function (err, wines) {
        res.status(200).send(wines);
    });
})
    .get('/:id', function (req, res, next) {
    wineDBService.init();
    wineDBService.findById(req.params.id, function (err, wine) {
        res.status(200).send(wine);
    });
})
    .put('/:id', function (req, res, next) {
    wineDBService.init();
})
    .put('/', function (req, res, next) {
    wineDBService.init();
    wineDBService.save(req.body, function (err, wine) {
        res.status(201).send(wine);
    });
});
module.exports = router;
//# sourceMappingURL=wine.js.map