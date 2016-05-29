import express = require('express');
import models = require('../models/wine');
import mockServices = require('../services/mockDataService');
import wineDocDBServices = require ('../services/wineDocumentDBService');

let router = express.Router();
 //let mockService = new mockServices.MockDataService();
 //let wines = mockService.mockData();
    
let wineDocDBService = new wineDocDBServices.WineDocumentDBService();
    wineDocDBService.init();

router.get('/', function (req, res, next) {
    
    let querySpec = {
            query: 'SELECT * FROM root r WHERE r.doctype=@doctype',
            parameters: [{
                name: '@doctype',
                value: "winedoc"
            }]
        };
    
    wineDocDBService.find(querySpec, function(err, results){
        if (err){
            res.status(500).send("Query failed");
        } else {
         res.status(200).send(results);
        }
    });
    
});

module.exports = router;