"use strict";
var express = require('express');
var services = require('../services/mockDataService');
var router = express.Router();
router.get('/', function (req, res, next) {
    var mockService = new services.MockDataService();
    var wines = mockService.mockData();
    res.send('respond with a resource' + wines);
});
module.exports = router;
//# sourceMappingURL=wine.js.map