"use strict";
var mongoose = require('mongoose');
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
    WineController.prototype.translateWineToMongoose = function (wine) {
        var wineSchema = new mongoose.Schema({
            name: String,
            variety: String
        });
        wineSchema.name = wine.name;
        wineSchema.variety = wine.variety;
        return wineSchema;
    };
    return WineController;
}());
exports.WineController = WineController;
//# sourceMappingURL=wineController.js.map