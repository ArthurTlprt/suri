var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: Date
})


var MessageModel = mongoose.model('message', MessageSchema);

var message = MessageModel;
module.exports = message;
