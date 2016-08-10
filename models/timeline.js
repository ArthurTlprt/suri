var mongoose = require('mongoose');

var TimelineSchema = new mongoose.Schema({
  title: String,
  date: Number,
  body: String,
  img: String
})


var TimelineModel = mongoose.model('timeline', TimelineSchema);

var timeline = TimelineModel;
module.exports = timeline;
