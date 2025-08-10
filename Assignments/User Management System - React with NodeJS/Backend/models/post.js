const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdDate: Date,
  updatedDate: Date
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
