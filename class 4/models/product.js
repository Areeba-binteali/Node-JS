const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
//   product_id: ObjectId,
  productTitle: String,
  productPrice: Number,
  deliveryCharges: Number,
  productDescription: String,
  createdDate: Date,
  lastUpdated: Date,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;