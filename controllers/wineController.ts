import mongoose = require('mongoose');
import wine = require ('../models/wine');

export class WineController{
    
    createWineMongooseSchema(){
        var wineSchema = new mongoose.Schema({
            name: String,
            variety: String
        });
        
        return wineSchema;
    }
    
    translateWineToMongoose(wine: wine.Wine){
        var wineSchema = new mongoose.Schema({
            name: String,
            variety: String
        });
        
        wineSchema.set("name", wine.name);
        wineSchema.set("variety", wine.variety); 
        wineSchema.set("_id", wine.externalRef);              
        
        return wineSchema;
    }
    
}