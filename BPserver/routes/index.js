var express = require('express');
var router = express.Router();
const { query } = require('../db/db.js');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
