var express = require('express');
var router = express.Router();
const { query } = require('../db/db.js');
const { checkTokenMiddleware } = require("../middleware/checkTokenMiddleware.js");

router.post('/test', checkTokenMiddleware, async function (req, res, next) {
  console.log(req.body);
  let { userId, accessToken, source, bp } = req.body;
  res.json("Pong");
});

router.get('/test', checkTokenMiddleware, async function (req, res, next) {
  let decodeData = decodeURIComponent(req.url);
  let bpData = JSON.parse(decodeData.split("?")[1]);
  let { userId, accessToken, source, bp } = bpData;
});

module.exports = router;
