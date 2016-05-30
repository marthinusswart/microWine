"use strict";
var mongoose = require('mongoose');
var wine = require('../models/wine');
var WineController = (function () {
    function WineController() {
    }
    WineController.prototype.createWineMongooseSchema = function () {
        var wineSchema = new mongoose.Schema({
            name: String,
            variety: String
        });
        return wineSchema;
    };
    WineController.prototype.translateWineToMongoose = function (wine, mongooseWine) {
        mongooseWine.name = wine.name;
        mongooseWine.variety = wine.variety;
        if (wine.externalRef !== "") {
            mongooseWine._id = wine.externalRef;
        }
        return 0;
    };
    WineController.prototype.translateMongooseToWine = function (wineSchema) {
        var wineObj;
        wineObj = new wine.Wine();
        wineObj.externalRef = wineSchema._id;
        wineObj.name = wineSchema.name;
        wineObj.variety = wineSchema.variety;
        return wineObj;
    };
    WineController.prototype.translateMongooseArrayToWineArray = function (wineSchemaArray) {
        var _this = this;
        var wineArray = [];
        wineSchemaArray.forEach(function (wineSchema) {
            wineArray.push(_this.translateMongooseToWine(wineSchema));
        });
        return wineArray;
    };
    return WineController;
}());
exports.WineController = WineController;
//# sourceMappingURL=wineController.js.map