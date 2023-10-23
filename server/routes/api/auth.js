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
router.post("/register", (req, res) => {
    let { username, password, email } = req.body;
    // 表單驗證
    if (username && password && email) {
        UserModel.findOne({ email }).then((user) => {
            if (user) {
                res.json({
                    code: "2001",
                    msg: "Email has already been used",
                    data: null
                });
            } else {
                // 透過md5進行密碼加密
                UserModel.create({ ...req.body, password: md5(password) }).then((data) => {
                    let { membership, id, username } = data;
                    res.json({
                        code: "2000", // 響應的編號 (一般使用2000表示成功)
                        msg: "Registration succeed", // 響應的信息
                        data: { membership, id, username } // 響應的數據
                    });
                }).catch((err) => {
                    res.json({
                        code: "5001",
                        msg: "Registration fails",
                        data: null
                    });
                });
            }
        });
    } else {
        res.json({
            code: "2001",
            msg: "Please fill in correct username or password",
            data: null
        });
    }
});

// 刪除帳號
router.delete("/:id", checkTokenMiddleware, (req, res) => {
    let id = req.params.id;
    UserModel.deleteOne({ id }).then((data) => {
        res.json({
            code: "2000",
            msg: "Account deleted!",
            data: null
        });
    }).catch((err) => {
        console.log(err);
        res.json({
            code: "2002",
            msg: "Invalid deletion",
            data: null
        });
    });
});

// 用戶登入
router.post("/login", (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            code: "2001",
            msg: "Please fill in correct email or password",
            data: null
        });
    }
    // 查詢數據庫
    UserModel.findOne({ email, password: md5(password) })
        .then((data) => {
            let { id, username } = data;

            // 創建accessToken
            const token = jwt.sign(
                {
                    email,
                    id
                },
                ACCESS_TOKEN_SECRET,
                { expiresIn: 60 * 60 * 24 * 7 } // 7天過期
            );

            // 創建refreshToken
            const refreshToken = jwt.sign(
                {
                    email,
                    id
                },
                REFRESH_TOKEN_SECRET,
                { expiresIn: 60 * 60 * 24 * 365 } // 1年過期
            );

            // 以json格式 提供 token, refresh token給用戶 
            res.json({
                code: "2000",
                msg: "Login succeeds",
                data: { token, refreshToken, id, username }
            });
        }).catch((err) => {
            console.log(err);
            res.json({
                code: "2001",
                msg: "Please fill in correct username or password",
                data: null
            });
        });
});

// 用戶登出
router.post("/logout/:id", checkTokenMiddleware, (req, res) => {
    // 銷毀session
    req.session.destroy(() => {
        res.json({
            code: "2000",
            msg: "Logout successfully!",
            data: null
        });
    });
});

module.exports = router;
