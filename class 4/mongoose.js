const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");
const MONGODB_URI = "mongodb://localhost:27017/ecomStore";

const app = express();

// Middleware
app.use(express.json());

// COnnecting mongoose
mongoose.connect(MONGODB_URI)
  .then(() => {console.log('Connected!');})
  .catch(err => console.log(err))
    

app.get("/product", async (req, res) => {
  try {
    const productModel = await Product.find();
    res.send({
      message: "All Products",
      products: productModel,
    })
  } catch (error) {
    console.log(err)
  }
});

// Server
const port = 3337;
app.listen(port, () => {
  console.log(`Server started at port: http://localhost:${port}/`)
})