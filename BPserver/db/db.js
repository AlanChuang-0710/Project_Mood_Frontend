/**
 * 處理連接Postgres
 * 
 */

const { Pool } = require("pg");
const { DBHOST, DBPORT, DBNAME, PASSWORD, USER } = require("../config/config");
async function setupDatabase() {
    // Do not use pool.query if you are using a transaction.
    const pool = new Pool({
        user: USER,
        host: DBHOST,
        port: DBPORT,
        password: PASSWORD,
        // Maximum number of clients the pool should contain
        // by default this is set to 10.
        max: 100
    });
    await pool.connect();

    // 處理連線錯誤事件
    pool.on('error', (err) => {
        console.error('資料庫錯誤', err);
    });

    // 處理連線成功事件
    pool.on("connect", () => {
        console.log("連接成功");

    });

    const res = await pool.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DBNAME}'`);

    if (res.rowCount === 0) {
        console.log(`$${DBNAME} database not found, creating it.`);
        await pool.query(`CREATE DATABASE "${DBNAME}";`);
        console.log(`created database ${DBNAME}.`);
    } else {
        console.log(`$${DBNAME} database already exists.`);
    }

    const tableSetup = await pool.query("CREATE TABLE IF NOT EXISTS userId (id serial, userId VARCHAR)");
    console.log(tableSetup);

    // pool.query(`CREATE DATABASE ${DBNAME}`, (err, res) => {
    //     console.log("Create db", res);
    //     // 創建userId Table
    //     pool.query("CREATE TABLE IF NOT EXISTS userId (id serial, userId VARCHAR)", (err, res) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(res.rows);
    //         }
    //     });
    // });
};

setupDatabase();






module.exports = {
    query: (text, params) => pool.query(text, params)
};