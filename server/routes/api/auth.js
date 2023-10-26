const express = require('express');

// 導入配置項
const { DBHOST, DBPORT, DBNAME, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../../config/config");

// 導入用戶模型
const UserModel = require("../../models/UserModel");

// 導入jwt 相關 
const jwt = require("jsonwebtoken");
const md5 = require('md5');

// 導入token較驗中間件
const { checkTokenMiddleware } = require("../../middleware/checkTokenMiddleware");
const router = express.Router();

// 註冊新帳號
router.post("/register", async (req, res) => {
    let { username, password, email } = req.body;
    // 表單驗證
    if (username && password && email) {
        const user = await UserModel.findOne({ email });
        if (user) {
            res.json({ code: 4001, msg: "Email has already been used", data: null });
        } else {
            try {
                const data = await UserModel.create({ ...req.body, password: md5(password) });
                let { membership, id, username } = data;
                res.json({
                    code: 2000, msg: "Registration succeed", data: { membership, id, username }
                });
            }
            catch (err) { res.json({ code: 5001, msg: "Registration fails", data: null }); };
        }
    } else {
        res.json({ code: 4001, msg: "Please fill in correct username or password", data: null });
    }
});

// 刪除帳號
router.delete("/:id", checkTokenMiddleware, async (req, res) => {
    let id = req.params.id;
    try {
        const data = await UserModel.deleteOne({ _id: id });
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
    let { email, password } = req.body;
    const errRes = (msg) => res.json({
        code: 4001,
        msg: msg,
        data: null
    });

    if (!email || !password) {
        return errRes();
    }
    // 查詢數據庫
    try {
        const data = await UserModel.findOne({ email, password: md5(password) });
        if (data) {
            let { id, username } = data;

            // 創建accessToken
            const accessToken = jwt.sign({ email, id }, ACCESS_TOKEN_SECRET,
                { expiresIn: 10 } // 10秒過期
            );

            // 創建refreshToken
            const refreshToken = jwt.sign({ email, id }, REFRESH_TOKEN_SECRET,
                { expiresIn: 60 * 60 * 12 } // 12小時過期
            );

            // Assigning refresh token in http-only cookie
            // samesite 限制跨域請求、secure 限制只能https或不限http/https傳送
            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 12, sameSite: "None", secure: true });

            // 以json格式 提供 token, 給用戶 
            res.json({
                code: 2000,
                msg: "Login succeeds",
                data: { accessToken, id, username }
            });
        } else {
            errRes("Please fill in correct email or password");
        }
    } catch (err) {
        console.log(err);
        errRes(err.msg);
    };
});

// 獲取refresh
router.get("/refresh", (req, res) => {
    try {
        if (req.cookies?.refreshToken) {
            const refreshToken = req.cookies.refreshToken;
            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, data) => {
                if (err) {
                    if (err instanceof jwt.JsonWebTokenError) {
                        return res.json({ code: 4001, msg: "accesstoken verification fails", data: err });
                    } else if (err instanceof jwt.TokenExpiredError) {
                        return res.json({ code: 4001, msg: "refreshToken expires", data: err });
                    }
                } else {
                    const accessToken = jwt.sign({ email: data.email, id: data.id }, ACCESS_TOKEN_SECRET,
                        { expiresIn: 10 } // 10秒過期
                    );
                    return res.json({ code: 2000, msg: "Token updated", data: { accessToken } });
                }
            });
        } else {
            res.json({ code: 4001, msg: "Unauthorized", data: null });
        }
    } catch (err) {
        res.json({ code: 4001, msg: "Unauthorized", data: null });
    }
});

// 用戶登出
router.post("/logout/:id", checkTokenMiddleware, (req, res) => {
    // 銷毀session
    req.session.destroy(() => {
        res.json({ code: 2000, msg: "Logout successfully!", data: null });
    });
});

module.exports = router;
