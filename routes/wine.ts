import express = require('express');
import models = require('../models/wine');
import wineMongoDBService = require('../services/wineMongoDBService');

let router = express.Router();
let wineDBService = new wineMongoDBService.WineMongoDBService();

router.get('/', function (req, res, next) {
    
    wineDBService.init();
    wineDBService.find(function(err, wines){
       res.status(200).send(wines); 
    });
    
});

module.exports = router;