const cheerio = require('cheerio');
const axios = require('axios');

axios.get('http://www.contradancelinks.com/schedule_AL.html')
  .then(function(response) {
    console.log(response);
  });
