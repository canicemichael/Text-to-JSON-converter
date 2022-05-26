const mongoose = require("mongoose");

const { Schema } = mongoose;

export const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String
});

export const Blog = mongoose.model('Blog', blogSchema);

