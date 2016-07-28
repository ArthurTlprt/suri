var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  img: String
})


var PostModel = mongoose.model('post', PostSchema);

var post = PostModel;
module.exports = post;
