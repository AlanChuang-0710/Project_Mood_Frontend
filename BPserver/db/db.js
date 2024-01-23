/**
 * 
 * @param {*} success 數據庫連接成功的回調
 * @param {*} error 數據庫連接失敗的回調
 */

module.exports = function (success, error) {

    if (typeof error !== "function") {
        error = () => {
            console.log("連接失敗");
        };
    }

    // 導入pg
    const { Client } = require("pg");

    // 導入配置
    const { DBHOST, DBPORT, DBNAME, PASSWORD, USER } = require("../config/config");

    const client = new Client({
        user: USER,
        host: DBHOST,
        port: DBPORT,
        database: DBNAME,
        password: PASSWORD
    });


    // // 設置回調 
    // // 設置成功連接的回調 once: 事件回調函數只執行一次
    // mongoose.connection.once("open", () => {
    //     success();
    // });

    // // 連接失敗的回調
    // mongoose.connection.on("error", () => {
    //     error();
    // });

    // // 關閉連接的回調
    // mongoose.connection.on("close", () => {
    //     console.log("關閉連接");
    // });

}

