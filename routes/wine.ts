import express = require('express');
import models = require('../models/wine');
import wineMongoDBService = require('../services/wineMongoDBService');

let router = express.Router();
let wineDBService = new wineMongoDBService.WineMongoDBService();

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
    .put('/:id', function(req, res, next){
        wineDBService.init();
    })
    .put('/', function(req, res, next){
        wineDBService.init();
        wineDBService.save(req.body, function(err, wine){
           res.status(201).send(wine); 
        });
    });

module.exports = router;