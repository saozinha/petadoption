var express = require('express');
//var app = require('app');
var router = express.Router();
var user = require('./../controllers/user');

/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.get('/', user.index);
router.get(':id', user.show);
//router.post('/', user.create);

module.exports = router;
