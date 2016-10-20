var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  img: String
})

// PostSchema.prototype.add(title, body, ) {
//
// }



var PostModel = mongoose.model('post', PostSchema);

var post = PostModel;
module.exports = post;
