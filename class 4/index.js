const express = require("express");
const { MongoClient } = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017";
const MONGO_DB_NAME = "ecomStore"

const app = express();
const client = new MongoClient(MONGODB_URI);

// Middleware
app.use(express.json());

// getting data
app.get("/api/products", async (req, res) => {
    try {
        await client.connect();
        const db = client.db(MONGO_DB_NAME);
        const productsCollection = db.collection('products');
        const data = await productsCollection.findOne();
        return res.send({
            message: "Success",
            data: data,
        })
    } catch (error) {
        console.log(error);
        return res.send({ success: false, error })
    }
})

// posting data
app.post("/api/products", async (req, res) => {
    let body = req.body;
    console.log(body);

    try {
        await client.connect();
        const db = client.db(MONGO_DB_NAME);
        const collection = db.collection('products');
        await collection.insertOne(body);
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }

});

// Server
const port = 3777;
app.listen(port, () => {
    console.log(`Server started at port: http://localhost:${port}/`)
})