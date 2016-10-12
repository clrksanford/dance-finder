const mongoose = require('mongoose');

var upcomingSchema = {
  series: String,
  callers: String,
  date: Date,
  location: String
}

var upcomingDance = mongoose.model('UpcomingDance', upcomingSchema);

module.exports = upcomingDance;
