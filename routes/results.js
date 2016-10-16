var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('lodash');
var Upcoming = require('../models/upcoming');


router.get('/', function (req, res, next) {
  res.render('results');
});

module.exports = router;
