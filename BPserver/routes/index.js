var express = require('express');
var router = express.Router();
const { query, format } = require('../db/db.js');
const { checkTokenMiddleware } = require("../middleware/checkTokenMiddleware.js");

async function bpInsertDB(userId, source, bp) {
  /* 法一: 一次性寫入 */
  let valueArr = bp.map((item) => [userId, item.bpId, item.timestamp, source]);
  const formatQuery = format("INSERT INTO event(user_id, bp_id, timestamp, source) VALUES %L", valueArr);
  const result = await query(formatQuery);
  
  /* 法二: 分次寫入 */
  // let valueArr = bp.map((item) => [userId, item.bpId, item.timestamp, source]);
  // // 使用 Promise.all 執行所有插入操作
  // const text = 'INSERT INTO event(user_id, bp_id, timestamp, source) VALUES($1, $2, $3, $4) RETURNING *';
  // const insertPromises = valueArr.map(data => {
  //   return query(text, data);
  // });
  // const result = await Promise.all(insertPromises);
  return result;
}

router.post('/test', checkTokenMiddleware, async function (req, res, next) {
  let { userId, source, bp } = req.body;
  const result = await bpInsertDB(userId, source, bp);
  res.json("Pong");
});

router.get('/test', checkTokenMiddleware, async function (req, res, next) {
  let decodeData = decodeURIComponent(req.url);
  let bpData = JSON.parse(decodeData.split("?")[1]);
  let { userId, source, bp } = bpData;
  const result = await bpInsertDB(userId, source, bp);
  res.json("Pong");
});

module.exports = router;
