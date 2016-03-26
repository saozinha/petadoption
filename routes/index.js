var express = require('express');
var router = express.Router();

var stylesheets = '/stylesheets/';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index2', { title: 'Express2' });
});

module.exports = router;
