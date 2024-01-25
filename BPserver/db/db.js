/**
 * 處理連接Postgres
 * 
 */

const { Pool } = require("pg");
const { DBHOST, DBPORT, DBNAME, PASSWORD, USER } = require("../config/config");

// Do not use pool.query if you are using a transaction.
const pool = new Pool({
    user: USER,
    host: DBHOST,
    port: DBPORT,
    database: DBNAME,
    password: PASSWORD,
    // Maximum number of clients the pool should contain
    // by default this is set to 10.
    max: 100
});

// 處理連線錯誤事件
pool.on('error', (err) => {
    console.error('資料庫錯誤', err);
});

// 處理連線成功事件
pool.on("connect", () => {
    console.log("連接成功");
});

// 測試資料庫連線
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('資料庫連線錯誤', err);
    } else {
        console.log('成功連線至 PostgreSQL，當前時間為：', res.rows[0].now);
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};