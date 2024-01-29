// 導入jsonwebtoken
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/config");

module.exports = {
    checkTokenMiddleware: (req, res, next) => {
        let { accessToken, userId } = req.body;
        // 一般放置在請求頭中，透過req.get獲取token
        if (!accessToken || !userId) {
            return res.json({ code: 4001, msg: "token缺失", data: null });
        }
        console.log(req.headers);
        next();

        /* BP server 要換方式較驗token! 如果使用API server方式，很可能API過來時就已經過期了 */
        // jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, data) => {
        //     console.log("_____我是jwt verify", data);
        //     if (err instanceof jwt.JsonWebTokenError || data.id !== userId) {
        //         return res.json({ code: 4001, msg: "accessToken verification fails", data: err });
        //     } else if (err instanceof jwt.TokenExpiredError) {
        //         return res.json({ code: 4001, msg: "accessToken expires", data: err });
        //     }
        // });
    }
};