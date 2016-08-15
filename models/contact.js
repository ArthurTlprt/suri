var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: Date
})


var ContactModel = mongoose.model('contact', ContactSchema);

var contact = ContactModel;
module.exports = contact;
