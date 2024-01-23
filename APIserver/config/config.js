// 配置文件
module.exports = {
    DBHOST: "127.0.0.1",
    DBPORT: 27017,
    DBNAME: "Mood",
    SERVERPORT: 3000,
    FRONTENDPORT: 8550,
    //  node  require("crypto").randomBytes(64).toString("hex") 製作token
    ACCESS_TOKEN_SECRET: "6c0b7ed3b2343e2867c88e29a06116cd1d42fe961ee632598f28e21edf02c9dcd2e4303ab22480a88aa7eb5aa236ff066be22b28a0a5da884643df53a46b837f",
    REFRESH_TOKEN_SECRET: "2d41eacaa6e1133a194c0646d94a6eb9ec72adf727f6f4b71aca6bc22b36e2bcae7f80b98b595f79dbf3b96d5432958f22e4485c60bd571ef9bf395634357fef"
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