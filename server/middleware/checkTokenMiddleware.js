// 導入jsonwebtoken
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/config");

module.exports = {
    checkTokenMiddleware: (req, res, next) => {
        // 一般放置在請求頭中，透過req.get獲取token
        let token = req.get("token");
        if (!token) {
            return res.json({
                code: "2003",
                msg: "token缺失",
                data: null
            });
        }

        // 較驗token
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
            // 檢測token && 確認req的id跟token中的id是不是同一個
            if (err || data.id !== req.params.id) {
                return res.json({
                    code: "2004",
                    msg: "token較驗失敗",
                    data: err
                });
            };
            // 將token內的用戶信息(id, email),，存到該次req中
            req.user = data;
            // 如果token較驗成功
            next();
        });
    }
};