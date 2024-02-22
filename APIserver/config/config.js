// 配置文件
//  node  require("crypto").randomBytes(64).toString("hex") 製作token
// 載入 dotenv
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../env/.env.' + process.env.NODE_ENV) });

module.exports = {
    DBHOST: process.env.DBHOST,
    DBPORT: process.env.DBPORT,
    DBNAME: process.env.DBNAME,
    SERVERHOST: process.env.SERVERHOST,
    SERVERPORT: process.env.SERVERPORT,
    FRONTENDHOST: process.env.FRONTENDHOST,
    FRONTENDPORT: process.env.FRONTENDPORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};


/* 
狀態碼
2000: 請求成功，用於一般成功的情況。
2001: 請求成功且新的資源成功被創建。
4000: 此回應意味伺服器因為收到無效語法，而無法理解請求。
4001: 需要授權以回應請求。
4003: 用戶端並無訪問權限，例如未被授權，所以伺服器拒絕給予應有的回應。不同於 401，伺服端知道用戶端的身份。
4004: 伺服器找不到請求的資源。
4010: 未找到，用於未找到所需資源的情況。
5000: 伺服器端發生未知或無法處理的錯誤。
5001: 資料庫錯誤，用於表示與資料庫交互時的錯誤。
*/

/* 
URL 設計
    1. 盡量採用RESTful API 風格
    2. 一律使用小寫，避免不同環境可能造成的影響
*/