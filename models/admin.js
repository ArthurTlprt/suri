var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
  email: String,
  password: String
})


var AdminModel = mongoose.model('admin', AdminSchema);

var admin = AdminModel;
module.exports = admin;
