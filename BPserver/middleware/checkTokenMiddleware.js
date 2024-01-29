// 導入jsonwebtoken
const jwt = require("jsonwebtoken");
// const { ACCESS_TOKEN_SECRET } = require("../config/config");

module.exports = {
    checkTokenMiddleware: (req, res, next) => {
        // 因為前端調用sendBeacon的關係，accesssToken必須從body中獲取
        // let { accessToken, userId } = req.body;
        // if (!accessToken || !userId) {
        //     return res.json({ code: 4001, msg: "token缺失", data: null });
        // }
        // console.log(req.headers);
        next();

        /* BP server 要換方式較驗token! 如果使用API server方式，很可能API過來時就已經過期了
            考量到用戶有些埋點動作，並不會發送請求到APIserver，換句話說用戶有可能在token已經過期的情況下，
            繼續使用APP(可能在同一頁面上下滑動)，故不應該以時間進行阻擋
        */
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