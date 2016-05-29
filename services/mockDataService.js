"use strict";
var models = require('../models/wine');
var MockDataService = (function () {
    function MockDataService() {
    }
    MockDataService.prototype.mockData = function () {
        var wines = [];
        var wine = new models.Wine();
        wine.name = "Wine Label 1";
        wine.variety = "Chardonnay";
        wines.push(wine);
        wine = new models.Wine();
        wine.name = "Wine Label 2";
        wine.variety = "Merlot";
        wines.push(wine);
        wine = new models.Wine();
        wine.name = "Wine Label 3";
        wine.variety = "Cabernet";
        wines.push(wine);
        return wines;
    };
    return MockDataService;
}());
exports.MockDataService = MockDataService;
//# sourceMappingURL=mockDataService.js.map