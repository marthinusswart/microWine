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
            //self.connection.collection("wine", function (err, collection) {
            //    if (err) {
            //        callback(err);
            //    } else {
            var wineSchema = self.wineController.createWineMongooseSchema();
            var wine = self.connection.model("wine", wineSchema, "wine");
            wine.find({}, function (err, wines) {
                if (err) {
                    self.connection.close();
                    callback(err);
                }
                else {
                    self.connection.close();
                    console.log(wines);
                    callback(null, wines);
                }
            });
            //}
            //});
        });
    };
    return WineMongoDBService;
}());
exports.WineMongoDBService = WineMongoDBService;
//# sourceMappingURL=wineMongoDBService.js.map