var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('lodash');
var Upcoming = require('../models/upcoming');

// router.use('/:state', function(req, res, next) {
//   Upcoming.find({state: req.params.state}, function (err, dances) {
//     if (err) {
//       console.log('error');
//       res.status(500).send();
//     } else if (!dances) {
//       console.log('no song found');
//       res.status(404).send();
//     } else {
//       res.json(dances);
//     }
//   });
// });

router.get('/', function (req, res, next) {
  res.render('results');
});

module.exports = router;
