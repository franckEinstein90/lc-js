var express = require('express');
var sysFGrammar = require('../grammars/systemF.js');

var router = express.Router();

/* GET home page. */
router.get('/Parse/:programName', function(req, res, next) {
    let parsed = sysFGrammar.parse("\\x:A.xx;");
    res.send("Parsed" + parsed);
});

router.get('/Run/:programName', function(req, res, next) {
  res.send("Running program");
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'lc-js' });
});

module.exports = router;
