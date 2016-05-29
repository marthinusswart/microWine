/**Azure Document DB service */
import documentdb = require('documentdb');
//import docdbUtils = require('./docdbUtils');

export class WineDocumentDBService {
    database: any;
    collection: any;
    client: any;

    init() {
        let self = this;
        let DocumentClient = documentdb.DocumentClient;
        let host = "https://microdb.documents.azure.com:443/";
        let masterKey = "wzARKJzhjv4Bn2m0702YHbieqfyv71rL7lxNsn8Wh0zWt34luPy4M0faluA0FC2F6rRpQOZQm2DWj4Ry9KlnjQ==";
        self.client = new DocumentClient(host, { masterKey: masterKey });

/*
        docdbUtils.getOrCreateDatabase(self.client, "microdb", function (err, db) {
            if (err) {
                console.log(err);
            } else {
                self.database = db;
                docdbUtils.getOrCreateCollection(self.client, self.database._self, "wine", function (err, coll) {
                    if (err) {
                        console.log(err);
                    } else {
                        self.collection = coll;
                    }
                });
            }
        });
        */

        return 0;
    }

    find(querySpec: any, callback: any) {
        let self = this;
        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results){
            if (err){
                callback(err);
            } else {
                callback(null, results);
            }
        });
        
        return 0;
    }

}


