"use strict";
var mongoose = require('mongoose');
var wineController = require('../controllers/wineController');
var WineMongoDBService = (function () {
    function WineMongoDBService() {
    }
    WineMongoDBService.prototype.init = function () {
        var db = new mongoose.Mongoose();
        this.connection = db.createConnection("localhost", "microdb");
        this.connection.on("error", console.error.bind(console, "connection error:"));
        this.wineController = new wineController.WineController();
    };
    WineMongoDBService.prototype.find = function (callback) {
        var self = this;
        this.connection.once("open", function () {
            var wineSchema = self.wineController.createWineMongooseSchema();
            var wineModel = self.connection.model("wine", wineSchema, "wine");
            wineModel.find({}, function (err, wines) {
                if (err) {
                    self.connection.close();
                    callback(err);
                }
                else {
                    self.connection.close();
                    console.log(wines);
                    callback(null, self.wineController.translateMongooseArrayToWineArray(wines));
                }
            });
        });
    };
    WineMongoDBService.prototype.findById = function (id, callback) {
        var self = this;
        this.connection.once("open", function () {
            var wineSchema = self.wineController.createWineMongooseSchema();
            var wineModel = self.connection.model("wine", wineSchema, "wine");
            wineModel.findById(id, function (err, wine) {
                if (err) {
                    self.connection.close();
                    callback(err);
                }
                else {
                    self.connection.close();
                    console.log(wine);
                    callback(null, self.wineController.translateMongooseToWine(wine));
                }
            });
        });
    };
    WineMongoDBService.prototype.save = function (newWine, callback) {
        var self = this;
        this.connection.once("open", function () {
            var wineSchema = self.wineController.createWineMongooseSchema();
            var wineModel = self.connection.model("wine", wineSchema, "wine");
            var newWineObj = new wineModel();
            self.wineController.translateWineToMongoose(newWine, newWineObj);
            newWineObj.save(function (err, result) {
                if (err) {
                    self.connection.close();
                    callback(err);
                }
                else {
                    self.connection.close();
                    console.log(result);
                    callback(null, self.wineController.translateMongooseToWine(result));
                }
            });
        });
    };
    return WineMongoDBService;
}());
exports.WineMongoDBService = WineMongoDBService;
//# sourceMappingURL=wineMongoDBService.js.map