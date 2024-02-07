var express = require('express');
var router = express.Router();
const { query, format, clientQuery } = require('../db/db.js');
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

// 
/**
 * 功能: 用於將event table的event數據依照用戶id進行分類
 * @param {Array} eventArray 數據庫回傳的數組 
 * @returns {Map} 依照用戶id分類事件的Map對象
 * @example {"uuid1": ()=> [{},{}...],"uuid2": ()=> [{},{}...], }
 */
function eventUserIdMap(eventArray) {
  if (!eventArray) throw Error("Please fill in parameter");
  let mapObj = new Map();
  eventArray.forEach((item) => {
    let data = mapObj.get(item.user_id);
    if (data) {
      data.push(item);
    } else {
      mapObj.set(item.user_id, [item]);
    }
  });
  return mapObj;
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

/* 獲得所有用戶的event count */
router.get(`/event/all`, checkTokenMiddleware, async function (req, res, next) {
  const formatQuery = "SELECT * FROM event";
  const result = await query(formatQuery).catch((err) => {
    throw Error(err);
  });
  const userIdEvMap = eventUserIdMap(result.rows);
  const clientData = await clientQuery("users");
  const transformData = clientData.reduce((accu, curr) => {
    accu[curr._id] = curr;
    return accu;
  }, {});
  let data = [];
  userIdEvMap.forEach((value, key) => {
    data.push({ user_id: key, count: value.length, lastLoginTime: transformData?.[key]?.lastLoginTime, username: transformData?.[key]?.username });
  });
  res.json({
    success: true,
    errorMessage: "",
    code: 2000,
    stackTrace: "",
    data
  });
});

/* 獲得特定用戶 所有 或 一段時間 內的所有event */
router.get(`/event/:user_id`, checkTokenMiddleware, async function (req, res, next) {
  const { user_id } = req.params;
  const { startTime, endTime } = req.query;
  let formatQuery;
  if (startTime && endTime) {
    formatQuery = format(`SELECT * FROM event WHERE user_id = %L AND timestamp >= %L AND timestamp <= %L`, user_id, startTime, endTime);
  } else {
    formatQuery = format(`SELECT * FROM event WHERE user_id = %L`, user_id);
  }
  const result = await query(formatQuery).catch((err) => {
    throw Error(err);
  });
  res.json({
    success: true,
    errorMessage: "",
    code: 2000,
    stackTrace: "",
    data: result.rows
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
