const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');

file_path = "C:/Users/achil/OneDrive/Documents/ESILV/A4/S8/WebAppArchi/clear-fashion/server/allProducts.json"
const products = JSON.parse(fs.readFileSync(file_path));
console.log(products);
console.log("Total items: \n", products.length);


const uri = "mongodb+srv://waa:waa@webapparchi.nxisrhh.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(async () => {
    const collection = client.db("clear-fashion").collection("products");
    const result = await collection.insertMany(products);
    console.log(result);
  client.close();
});