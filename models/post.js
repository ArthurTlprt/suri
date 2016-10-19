var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  img: String
})

// PostSchema.prototype.add(title, body, ) {
//
// }

PostSchema.methods.update = function() {
  this.save();
}


var PostModel = mongoose.model('post', PostSchema);

var post = PostModel;
module.exports = post;
