var express = require('express');
var router = express.Router();
const { query } = require('../db/db.js');
const { checkTokenMiddleware } = require("../middleware/checkTokenMiddleware.js");

router.post('/test', checkTokenMiddleware, async function (req, res, next) {
  const result = await query("SELECT * FROM event");
  console.log(req.body);
  res.json("Pong");
});

module.exports = router;
