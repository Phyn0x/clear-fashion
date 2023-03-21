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
