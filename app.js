require('dotenv').config({silent: true});

var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION);

var Upcoming = require('./models/upcoming');

const cheerio = require('cheerio');
const axios = require('axios');

// BUILD LIST OF STATES FROM GITHUB USER mshafrir
axios.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json')
  .then(function(response) {
    var stateArray = [];
    response.data.forEach(function(item) {
      stateArray.push(item.abbreviation);
      return stateArray;
    });

    $('dd').each(function(i,dd) {
      var text = $(this).text();
      var [startDate, rest] = text.split(' Dance Series: ');
      startDate = new Date(startDate);

      var [danceSeries, rest] = rest.split(' Location: ');
      var [location, rest] = rest.split(' Caller(s): ');
      var [callers, rest] = rest.split(' Band(s)/Musician(s): ');
      var [bands, rest] = rest.split(' Note: ');

      var upcomingDanceEntry = new Upcoming({
        series: danceSeries,
        callers: callers,
        date: startDate,
        location: location
      });

      upcomingDanceEntry.save(function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('Success!', upcomingDanceEntry);
        }
      });
    });
  });
