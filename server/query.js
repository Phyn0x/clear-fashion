const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const fs = require('fs');

function getClient() {
    const uri = "mongodb+srv://waa:waa@webapparchi.nxisrhh.mongodb.net?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    return client;
}

function Query(filter = {}, options = {}){
    const client = getClient();
    client.connect(async () => {
        const collection = client.db("clear-fashion").collection("products");
        const results = await collection.find(filter, options).toArray();
        console.log("Number of products:", results.length)
        client.close();
        return results;
    });
}

function FindAllBrandProduct(brandName = "dedicated") {
    const script = {brand_name: `${brandName}`};
    return Query(script);
}

FindAllBrandProduct();