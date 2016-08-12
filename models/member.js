var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({
  name: String,
  legend: String,
  img: String,
  facebook: String
})


var MemberModel = mongoose.model('member', MemberSchema);

var member = MemberModel;
module.exports = member;
