var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('lodash');
var Upcoming = require('../models/upcoming');


/* GET home page. */
router.get('/', function(req, res, next) {
  Upcoming.findById('58029f046b6e6f1933e8da7c', function (err, dance) {
    if (err) {
      console.log('error');
      res.status(500).send();
    } else if (!dance) {
      console.log('no song found');
      res.status(404).send();
    } else {
      console.log(dance);
      res.json(dance);
    }
  });
});

module.exports = router;
