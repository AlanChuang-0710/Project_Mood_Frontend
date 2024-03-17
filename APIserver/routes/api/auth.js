const express = require('express');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("@config/config");
const UserModel = require("@models/UserModel");
const FeelingModel = require("@models/FeelingModel");
const jwt = require("jsonwebtoken");
const md5 = require('md5');

// 導入token較驗中間件
const { checkTokenMiddleware } = require("@middleware/checkTokenMiddleware");
const router = express.Router();

// 註冊新帳號
router.post("/register", async (req, res) => {
    let { username: name, password, email } = req.body;
    let err = new Error("Please fill in correct information");
    err.code = 40000;
    if (!name || !password || !email) throw err;
    const user = await UserModel.findOne({ email });
    if (user) {
        err.message = "Email has already been used";
        throw err;
    };
    const newUser = await UserModel.createDefaultUser({ ...req.body, password: md5(password) });
    let { membership, id, username } = newUser;
    FeelingModel.createDefaultFeeling(id);
    return res.json({
        code: 2000, msg: "Registration succeed", data: { membership, id, username }
    });

});

// 刪除帳號 理論上應該標示status為 active或inactive 
router.delete("/:id", checkTokenMiddleware, async (req, res) => {
    let id = req.params.id;
    try {
        const data = await UserModel.deleteOne({ _id: id });
        await FeelingModel.deleteOne({ userId: id });
        if (data.deletedCount) {
            res.json({ code: 2000, msg: "Account deleted", data: null });
        } else {
            throw Error();
        }
    } catch (err) {
        res.json({ code: 4001, msg: "Invalid deletion", data: null });
    }
});

// 用戶登入
router.post("/login", async (req, res) => {
    let err = new Error("Please fill in correct information");
    err.code = 40001;

    let { email, password } = req.body;
    if (!email || !password) throw err;

    const data = await UserModel.findOne({ email, password: md5(password) });
    if (!data) throw err;

    let { id, username } = data;
    data.lastLoginTime = Date.now();
    data.save();

    const accessToken = jwt.sign({ email, id }, ACCESS_TOKEN_SECRET,
        { expiresIn: 20 } // 創建accessToken 20秒過期
    );

    const refreshToken = jwt.sign({ email, id }, REFRESH_TOKEN_SECRET,
        { expiresIn: 60 * 60 * 12 } // 創建refreshToken 12小時過期
    );

    // Assigning refresh token in http-only cookie
    // samesite 限制跨域請求、secure 限制只能https或不限http/https傳送
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 12, sameSite: "None", secure: true });

    res.json({
        code: 2000,
        msg: "Login succeeds",
        data: { accessToken, id, username, email }
    });
});

// 獲取refresh
router.get("/refresh", (req, res) => {
    if (req.cookies?.refreshToken) {
        const refreshToken = req.cookies.refreshToken;
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, data) => {
            if (err) {
                let err = new Error("");
                err.code = 40301;
                err.message = err instanceof jwt.JsonWebTokenError ? "accesstoken verification fails" : err instanceof jwt.TokenExpiredError ? "refreshToken expires" : "Undefined Error";
                throw err;
            }
            const accessToken = jwt.sign({ email: data.email, id: data.id }, ACCESS_TOKEN_SECRET,
                { expiresIn: 20 } // 20秒過期
            );
            res.json({ code: 2000, msg: "Token updated", data: { accessToken } });
        });
    } else {
        let err = new Error("Unauthorized");
        err.code = 40101;
        throw err;
    }
});

// 用戶登出 (採用jwt 後端不控制登出訊息)
// router.post("/logout/:id", checkTokenMiddleware, (req, res) => {
//     // 銷毀session
//     req.session.destroy(() => {
//         res.json({ code: 2000, msg: "Logout successfully!", data: null });
//     });
// });

module.exports = router;
