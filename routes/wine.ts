import express = require('express');
import models = require('../models/wine');
import services = require('../services/mockDataService');

let router = express.Router();

router.get('/', function (req, res, next) {
    let mockService = new services.MockDataService();
    let wines = mockService.mockData();
    
    res.send('respond with a resource' + wines);
});

module.exports = router;