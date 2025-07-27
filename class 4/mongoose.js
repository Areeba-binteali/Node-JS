const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const Product = require("./models/product");
const User = require("./models/user");
const MONGODB_URI = "mongodb://localhost:27017/ecomStore";

const app = express();

// Middleware
app.use(express.json());

// COnnecting mongoose
mongoose.connect(MONGODB_URI)
  .then(() => {console.log('Connected!');})
  .catch(err => console.log(err))
    

app.get("/products", async (req, res) => {
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

// Posting using schema
// app.post("/products", async (req, res) => {
//   const newProduct = new Product(req.body);
//   const allProducts = await Product.find();
//   allProducts.push(newProduct);
//   res.send({
//     message: "Succesfully Added Product!",
//     product: allProducts,
//   })

// });

// users
app.get("/api/users", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send({
      message: "users data",
      data: user,
    })
  } catch (error) {
    res.status(500).send({
      message: "Error in getting Data",
      error: error,
    })
  }
});

// posting new user
app.post("/api/users", async (req, res) => {
  try {
    const newUser = req.body;
    const password = await bcrypt.hash(newUser.password, 10)
    const user = new User({ ...newUser, password: password });
    await user.save();
    res.send({
      data: user,
      message: "success",
    })
  } catch (error) {
    res.status(500).send({data: null, success: false, error})
  }
});


// Server
const port = 3337;
app.listen(port, () => {
  console.log(`Server started at port: http://localhost:${port}/`)
})