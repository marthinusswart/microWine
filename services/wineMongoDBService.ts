import mongoose = require('mongoose');
import wine = require('../models/wine');
import wineController = require('../controllers/wineController');

export class WineMongoDBService {
    connection: mongoose.Connection;
    wineController: wineController.WineController;
    wasInit: boolean = false;

    init() {
        if (!this.wasInit) {
            let db = new mongoose.Mongoose();
            this.connection = db.createConnection("localhost", "microdb");
            this.connection.on("error", console.error.bind(console, "connection error:"));
            this.wineController = new wineController.WineController();
            this.wasInit = true;
        }
    }

    find(callback) {
        var self = this;
        this.connection.once("open", function () {
            //self.connection.collection("wine", function (err, collection) {
            //    if (err) {
            //        callback(err);
            //    } else {
            let wineSchema = self.wineController.createWineMongooseSchema();
            var wine = self.connection.model("wine", wineSchema, "wine");
            wine.find({}, function (err, wines) {
                if (err) {
                    self.connection.close();
                    callback(err);
                } else {
                    self.connection.close()
                    console.log(wines);
                    callback(null, wines);
                }
            });
            //}
            //});
        });
    }
}