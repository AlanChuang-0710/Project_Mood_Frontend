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

    // 導入mongoose
    const mongoose = require("mongoose");

    // 導入配置
    const { DBHOST, DBPORT, DBNAME } = require("../config/config");

    // 連接mongodb服務  mood是數據庫名稱，如果不存在會自動創建
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    // 設置回調 
    // 設置成功連接的回調 once: 事件回調函數只執行一次
    mongoose.connection.once("open", () => {
        success();
    });

    // 連接失敗的回調
    mongoose.connection.on("error", () => {
        error();
    });

    // 關閉連接的回調
    mongoose.connection.on("close", () => {
        console.log("關閉連接");
    });

}

