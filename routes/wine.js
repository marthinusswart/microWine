"use strict";
var express = require('express');
var wineDocDBServices = require('../services/wineDocumentDBService');
var router = express.Router();
//let mockService = new mockServices.MockDataService();
//let wines = mockService.mockData();
var wineDocDBService = new wineDocDBServices.WineDocumentDBService();
wineDocDBService.init();
router.get('/', function (req, res, next) {
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.doctype=@doctype',
        parameters: [{
                name: '@doctype',
                value: "winedoc"
            }]
    };
    wineDocDBService.find(querySpec, function (err, results) {
        if (err) {
            res.status(500).send("Query failed");
        }
        else {
            res.status(200).send(results);
        }
    });
});
module.exports = router;
//# sourceMappingURL=wine.js.map