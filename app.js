require('dotenv').config({silent: true});

var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION);

const cheerio = require('cheerio');
const axios = require('axios');

axios.get('http://www.contradancelinks.com/schedule_AL.html')
  .then(function(response) {
    var goodString = response.data.replace("<BR><BR>\n<DD>", "<BR><BR></DD>\n<DD>");
    let $ = cheerio.load(goodString, {
      ignoreWhitespace: true,
      lowerCaseTags: true
    });

    $('dd').each(function(i,dd) {
      var text = $(this).text();
      var [startDate, rest] = text.split(' Dance Series: ');
      startDate = new Date(startDate);

      var [danceSeries, rest] = rest.split(' Location: ');
      var [location, rest] = rest.split(' Caller(s): ');
      var [callers, rest] = rest.split(' Band(s)/Musician(s): ');
      var [bands, rest] = rest.split(' Note: ');
  });
