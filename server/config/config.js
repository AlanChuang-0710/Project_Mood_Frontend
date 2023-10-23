// 配置文件
module.exports = {
    DBHOST: "127.0.0.1",
    DBPORT: 27017,
    DBNAME: "Mood",
    //  node  require("crypto").randomBytes(64).toString("hex") 製作token
    ACCESS_TOKEN_SECRET: "6c0b7ed3b2343e2867c88e29a06116cd1d42fe961ee632598f28e21edf02c9dcd2e4303ab22480a88aa7eb5aa236ff066be22b28a0a5da884643df53a46b837f",
    REFRESH_TOKEN_SECRET: "2d41eacaa6e1133a194c0646d94a6eb9ec72adf727f6f4b71aca6bc22b36e2bcae7f80b98b595f79dbf3b96d5432958f22e4485c60bd571ef9bf395634357fef"
};


/* 
狀態碼
2000: 請求成功，用於一般成功的情況。
2001: 請求參數錯誤/不允許，提示用戶填寫正確的用戶名或密碼。
2002: 用戶未找到，提示用戶不存在或無法驗證。
4000: 未授權訪問，用於需要驗證但未經授權的情況。
4001: 登入過期，表示用戶的登入已經過期。
4010: 未找到，用於未找到所需資源的情況。
5000: 伺服器內部錯誤，通用的內部錯誤情況。
5001: 資料庫錯誤，用於表示與資料庫交互時的錯誤。
*/

/* 
URL 設計
    1. 盡量採用RESTful API 風格
    2. 一律使用小寫，避免不同環境可能造成的影響
*/