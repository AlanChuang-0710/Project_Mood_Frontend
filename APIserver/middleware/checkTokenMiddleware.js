// 導入jsonwebtoken
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("@config/config");

module.exports = {
    checkTokenMiddleware: (req, res, next) => {
        // 一般放置在請求頭中，透過req.get獲取token
        let accessToken = req.get("accessToken");
        if (!accessToken) {
            return res.json({ code: 4001, msg: "token缺失", data: null });
        }

        // 較驗token
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                let error = err;
                error.code = 40101;

                if (err instanceof jwt.JsonWebTokenError) {
                    throw error;
                    // return res.json({ code: 40101, msg: "accessToken verification fails", data: err });
                } else if (err instanceof jwt.TokenExpiredError) {
                    throw error;
                    // return res.json({ code: 40101, msg: "accessToken expires", data: err });
                }
            }
            else {
                req.user = data; // 將token內的用戶信息(id, email),，存到該次req中
                next(); // 如果token較驗成功
            }
        });
    }
};