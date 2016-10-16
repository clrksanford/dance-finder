var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('lodash');
var Upcoming = require('../models/upcoming');


/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/:id', function(req, res, next) {
  Upcoming.findById(req.params.id, function (err, dances) {
    if (err) {
      console.log('error');
      res.status(500).send();
    } else if (!dances) {
      console.log('no song found');
      res.status(404).send();
    } else {
      res.json(dances);
    }
  });
});

module.exports = router;
