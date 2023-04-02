const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const fs = require('fs');

function getClient() {
    const uri = "mongodb+srv://waa:waa@webapparchi.nxisrhh.mongodb.net?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    return client;
}

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

app.get('/brands', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("clear-fashion").collection("products");
    const result = await collection.distinct('brand_name');
    response.send({result:result});
  }
  catch{
    response.send({error : "Couldn't fetch brands"}); 
  }
});

app.get('/products', async (request, response) => {
  const client = getClient();
  const collection = client.db("clear-fashion").collection("products");
  const result = await collection.find({}).toArray();
  response.send({result:result});
});

app.get('/products/search', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("clear-fashion").collection("products");

    script = {};
    var limit = request.query.limit;
    var brand = request.query.brand;
    var price = request.query.price;
    var page = request.query.page;

    if(limit == undefined){
      limit = 12;
    }
    else{
      limit = parseInt(limit);
    }
    const skip = (page - 1) * limit;

    
    if(brand){
      script.brand_name = brand;
    }

    if(price){
      script.price = {$lte: parseInt(price)};
    }

    if(page == undefined){
      page = 1;
    }
    else{
      page = parseInt(page);
    }
    const count = await collection.countDocuments(script);
    const totalPages = Math.ceil(count / limit);

    const result = await collection.find(script).skip(skip).limit(limit).toArray();
    response.send({result : result, totalPages : totalPages})
  }
  catch(err){
    response.send({error : "Can't search this information."})
  }
})

app.get('/products/:id', async (request, response) => {
  try{
    const productId = request.params.id;
    const script = {_id : ObjectId(productId)};
    const client = getClient();
    const collection = client.db("clear-fashion").collection("products");
    const result = await collection.find(script).toArray();
    response.send({result : result})
  }
  catch(err){
    response.send({error : "Can't find an item with this id"})
  }
})

app.get('/products', async (request, response) => {
  const client = getClient();
  const collection = client.db("clear-fashion").collection("products");
  const result = await collection.find({}).toArray();
  response.send({result:result});
});

app.get('/sort', async (request, response) => {
  const client = getClient();
  const collection = client.db("clear-fashion").collection("products");
  var sortVal = request.query.sort;

  const sortType ={};
  if(sortVal==1){
    sortType.price = 1;
  }
  else if(sortVal==-1){
    sortType.price = -1;
  }
  else{
    sortType.price = 0;
  }

  const result = await collection.find({}).sort(sortType).toArray();

  response.send({result:result});
});

