// 配置文件
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../env/.env.' + process.env.NODE_ENV) });

module.exports = {
    DBHOST: process.env.DBHOST,
    DBPORT: process.env.DBPORT,
    DBNAME: process.env.DBNAME,
    PASSWORD: process.env.PASSWORD,
    USER: process.env.USER,
    SERVERHOST: process.env.SERVERHOST,
    SERVERPORT: process.env.SERVERPORT,
    FRONTENDHOST: process.env.FRONTENDHOST,
    FRONTENDPORT: process.env.FRONTENDPORT,
    APIDBHOST: process.env.APIDBHOST,
    APIDBPORT: process.env.APIDBPORT,
    APIDBNAME: process.env.APIDBNAME,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
};