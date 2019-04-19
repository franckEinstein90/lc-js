var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/Run/:programName', function(req, res, next) {
  res.send("Running program");
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'lc-js' });
});

module.exports = router;
