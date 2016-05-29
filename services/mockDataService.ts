import models = require('../models/wine');
export class MockDataService{
    mockData() {
        let wines = [];

        let wine = new models.Wine();
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
    }
}