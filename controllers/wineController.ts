import mongoose = require('mongoose');
import wine = require('../models/wine');

export class WineController {

    createWineMongooseSchema() {
        var wineSchema = new mongoose.Schema({
            name: String,
            variety: String
        });

        return wineSchema;
    }

    translateWineToMongoose(wine: wine.Wine, mongooseWine: any) {
        mongooseWine.name = wine.name;
        mongooseWine.variety = wine.variety;
        if (wine.externalRef !== "") {
            mongooseWine._id = wine.externalRef;
        }

        return 0
    }

    translateMongooseToWine(wineSchema: any): wine.Wine {
        let wineObj: wine.Wine;
        wineObj = new wine.Wine();
        wineObj.externalRef = wineSchema._id;
        wineObj.name = wineSchema.name;
        wineObj.variety = wineSchema.variety;

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