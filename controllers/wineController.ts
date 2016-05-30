import mongoose = require('mongoose');
import wine = require('../models/wine');

export class WineController {

    createWineMongooseSchema() {
        var wineSchema = new mongoose.Schema({
            name: String,
            variety: String,
            estate: String
        });

        return wineSchema;
    }

    translateWineToMongoose(wine: wine.Wine, mongooseWine: any) {
        mongooseWine.name = wine.name;
        mongooseWine.variety = wine.variety;
        mongooseWine.estate = wine.estate;
        if (wine.externalRef !== "") {
            mongooseWine._id = wine.externalRef;
        }

        return 0
    }

    translateMongooseToWine(mongooseWine: any): wine.Wine {
        let wineObj: wine.Wine;
        wineObj = new wine.Wine();
        wineObj.externalRef = mongooseWine._id;
        wineObj.name = mongooseWine.name;
        wineObj.variety = mongooseWine.variety;
        wineObj.estate = mongooseWine.estate;

        return wineObj;
    }

    translateMongooseArrayToWineArray(wineSchemaArray) {
        var wineArray = [];
        wineSchemaArray.forEach((wineSchema: mongoose.Schema) => {
            wineArray.push(this.translateMongooseToWine(wineSchema));
        });
        return wineArray;
    }

}