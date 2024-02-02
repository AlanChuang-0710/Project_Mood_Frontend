/**
 * 處理連接Postgres
 * 
 */

const { Pool } = require("pg");
const format = require('pg-format');
const { DBHOST, DBPORT, DBNAME, PASSWORD, USER } = require("../config/config");

let processPool;
async function setupDatabase() {
    const checkAndSetupDB = async () => {
        // 較驗並創建database
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
        // 較驗並創建database
        const res = await pool.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DBNAME}'`);
        if (res.rowCount === 0) {
            await pool.query(`CREATE DATABASE "${DBNAME}";`);
            console.log(`created database ${DBNAME}`);
        }
        pool.end();
    };
    await checkAndSetupDB();
    // Do not use pool.query if you are using a transaction.
    processPool = new Pool({
        user: USER,
        host: DBHOST,
        port: DBPORT,
        password: PASSWORD,
        database: DBNAME,
        // Maximum number of clients the pool should contain
        // by default this is set to 10.
        max: 100
    });
    // 處理連線時的錯誤事件
    processPool.on('error', async (err) => {
        console.error('資料庫錯誤', err);
    });
    // 一次性連線成功事件
    processPool.once("connect", () => {
        console.log("連接成功");
    });

    await processPool.connect();

    // 較驗並創建table && type
    const eventTypeCheck = await processPool.query("SELECT 1 FROM pg_type WHERE typname = 'event_source'");
    if (eventTypeCheck.rowCount === 0) {
        processPool.query("CREATE TYPE event_source AS ENUM ('IOS','desktop','Android','other mobiles')");
        console.log("created type eventType");
    };

    processPool.query('CREATE TABLE IF NOT EXISTS userid (id serial, user_id varchar PRIMARY KEY NOT NULL)');
    processPool.query('CREATE TABLE IF NOT EXISTS burypoint (id serial, bp_id varchar PRIMARY KEY, name text NOT NULL, trackend text NOT NULL, type text NOT NULL, des text NOT NULL)');
    processPool.query('CREATE TABLE IF NOT EXISTS event (id serial, user_id varchar PRIMARY KEY, bp_id varchar NOT NULL, timestamp varchar NOT NULL, source text NOT NULL)');
};
setupDatabase();
module.exports = {
    query: (text, params) => processPool.query(text, params),
    format
};