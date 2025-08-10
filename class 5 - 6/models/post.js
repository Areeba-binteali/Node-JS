const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
//   product_id: ObjectId,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  createdDate: Date,
  updatedDate: Date,
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;