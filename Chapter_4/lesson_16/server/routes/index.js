var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/oneone', function(req, res, next) {
  res.render('oneone', { title: 'Express' });
});

/* GET home page. */
router.get('/onetwo', function(req, res, next) {
  res.render('onetwo', { title: 'Express' });
});

module.exports = router;
