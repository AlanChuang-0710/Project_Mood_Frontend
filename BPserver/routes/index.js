var express = require('express');
var router = express.Router();
const { query, format } = require('../db/db.js');
const { checkTokenMiddleware } = require("../middleware/checkTokenMiddleware.js");

async function bpInsertDB(userId, source, bp) {
  /* 法一: 一次性寫入 */
  let valueArr = bp.map((item) => [userId, item.bp_id, item.timestamp, source]);
  const formatQuery = format("INSERT INTO event(user_id, bp_id, timestamp, source) VALUES %L", valueArr);
  const result = await query(formatQuery).catch((err) => {
    throw Error(err);
  });

  /* 法二: 分次寫入 */
  // let valueArr = bp.map((item) => [userId, item.bp_id, item.timestamp, source]);
  // // 使用 Promise.all 執行所有插入操作
  // const text = 'INSERT INTO event(user_id, bp_id, timestamp, source) VALUES($1, $2, $3, $4) RETURNING *';
  // const insertPromises = valueArr.map(data => {
  //   return query(text, data);
  // });
  // const result = await Promise.all(insertPromises);
  return result;
}

/* 獲得所有bury point */
router.get("/bp/all", checkTokenMiddleware, async function (req, res, next) {
  const result = await query("SELECT * FROM burypoint ORDER BY bp_id ASC").catch((err) => {
    throw Error(err);
  });
  res.json({
    success: true,
    errorMessage: "",
    code: 2000,
    stackTrace: "",
    data: { bp: result.rows }
  });
});

/* 新增bury point */
router.post("/bp", checkTokenMiddleware, async function (req, res, next) {
  const { bp_id, name, trackend, type, des } = req.body;
  let valueArr = [bp_id, name, trackend, type, des];
  const formatQuery = format("INSERT INTO burypoint(bp_id, name, trackend, type, des) VALUES (%L) RETURNING *", valueArr);
  const result = await query(formatQuery).catch((err) => {
    throw Error(err);
  });
  res.json({
    success: true,
    errorMessage: "",
    code: 2000,
    stackTrace: "",
    data: { bp: result.rows }
  });
});

/* 刪除bury point */
router.delete("/bp/:bp_id", checkTokenMiddleware, async function (req, res, next) {
  const { bp_id } = req.params;
  const formatQuery = format("DELETE FROM burypoint WHERE bp_id = %L", bp_id);
  const result = await query(formatQuery).catch((err) => {
    throw Error(err);
  });
  res.json({
    success: true,
    errorMessage: "",
    code: 2000,
    stackTrace: "",
    data: null
  });
});

/* 編輯bury point */
router.put("/bp/:bp_id", checkTokenMiddleware, async function (req, res, next) {
  const { bp_id } = req.params;
  const { name, trackend, type, des } = req.body;
  const formatQuery = format("UPDATE burypoint SET name = %L, trackend = %L, type = %L, des = %L WHERE bp_id = %L", name, trackend, type, des, bp_id);
  const result = await query(formatQuery).catch((err) => {
    throw Error(err);
  });
  res.json({
    success: true,
    errorMessage: "",
    code: 2000,
    stackTrace: "",
    data: null
  });
});

/* 新增用戶event */
router.post('/event', checkTokenMiddleware, async function (req, res, next) {
  let { userId, source, bp } = req.body;
  const result = await bpInsertDB(userId, source, bp);
  res.json("Pong");
});

/* 新增用戶event  兼容性*/
router.get('/event', checkTokenMiddleware, async function (req, res, next) {
  let decodeData = decodeURIComponent(req.url);
  let bpData = JSON.parse(decodeData.split("?")[1]);
  let { userId, source, bp } = bpData;
  const result = await bpInsertDB(userId, source, bp);
  res.json("Pong");
});

module.exports = router;
