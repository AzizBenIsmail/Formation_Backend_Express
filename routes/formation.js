var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/marahbe', function(req, res, next) {
  res.json('ye marahbe bik hello world'); 
});  

module.exports = router;
