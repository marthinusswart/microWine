import mongoose = require('mongoose');
import wine = require('../models/wine');
import wineController = require('../controllers/wineController');

export class WineMongoDBService {
    connection: mongoose.Connection;
    wineController: wineController.WineController;

    init() {
        let db = new mongoose.Mongoose();
        this.connection = db.createConnection("localhost", "microdb");
        this.connection.on("error", console.error.bind(console, "connection error:"));
        this.wineController = new wineController.WineController();

    }

    find(callback) {
        var self = this;
        this.connection.once("open", function () {

            let wineSchema = self.wineController.createWineMongooseSchema();
            var wineModel = self.connection.model("wine", wineSchema, "wine");
            wineModel.find({}, function (err, wines) {
                if (err) {
                    self.connection.close();
                    callback(err);
                } else {
                    self.connection.close()
                    console.log(wines);
                    callback(null, self.wineController.translateMongooseArrayToWineArray(wines));
                }
            });

        });
    }
    
    findById(id: string, callback) {
        var self = this;
        this.connection.once("open", function () {

            let wineSchema = self.wineController.createWineMongooseSchema();
            var wineModel = self.connection.model("wine", wineSchema, "wine");
            wineModel.findById(id, function (err, wine:mongoose.Schema) {
                if (err) {
                    self.connection.close();
                    callback(err);
                } else {
                    self.connection.close()
                    console.log(wine);
                    callback(null, self.wineController.translateMongooseToWine(wine));
                }
            });

        });
    }
    
    save(newWine: wine.Wine, callback){
        var self = this;
        this.connection.once("open", function () {

            let wineSchema = self.wineController.createWineMongooseSchema();
            var wineModel = self.connection.model("wine", wineSchema, "wine");            
            var newWineObj = new wineModel();
            self.wineController.translateWineToMongoose(newWine, newWineObj);   
                     
            newWineObj.save(function (err, result) {
                if (err) {
                    self.connection.close();
                    callback(err);
                } else {
                    self.connection.close()
                    console.log(result);
                    callback(null, self.wineController.translateMongooseToWine(result));                    
                }
            });

        });
    }
}