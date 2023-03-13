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
        console.log(results);
        console.log("Number of products:", results.length);
        client.close();
        return results;
    });
}

function FindAllBrandProduct(brandName = "dedicated") {
    const script = {brand_name: `${brandName}`};
    return Query(script);
}

function ProductsLessThan(price){
    const script = {price:{$lt:price}}
    return Query(script);
}


function SortItemsByPrice(order = "desc") {
    var script;
    if(order === "desc") {
        script = {sort: {price:-1}};
    }
    else {
        script = {sort: {price:1}};
    }
    return Query({}, script);
}

function sortItemsDate(order = "desc"){
    var script;
    if(order === "desc") {
        script = {sort: {scrape_date:-1}};
    }
    else {
        script = {sort: {scrape_date:1}};
    }
    return Query({}, script);
}

function productsScrapedLessThan(time = 14){ //In days
    const script = {scrape_date:{$gt:new Date(Date.now() - time * 24 * 60 * 60 * 1000)}}
    return Query({},script);
}

//FindAllBrandProduct();
//ProductsLessThan(35);
//SortItemsByPrice();
//sortItemsDate();
//productsScrapedLessThan();