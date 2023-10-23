// 引入 express
const express = require('express');
const router = express.Router();

// 導入用戶上傳圖片相關
const fs = require("fs");
const moment = require("moment");
const { nanoid } = require("nanoid");
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
    // 如果destination使用函數，則必須自己創建目標資料夾
    // 如果destination使用string，則multer會協助創建
    destination: function (req, file, cb) {


        // 用戶照片存儲資料夾結構改成
        // public/images/userId/timestamp(unix格式)
        // 寫法參考以下代碼
        // 2. 遞回創建文件夾
        // 先創建src目錄->創建level1目錄->創建level2目錄
        // fs.mkdir("./src/level1/level2", { recursive: true }, err => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log("創建成功!");
        // });

        // 創建userId資料夾
        const userId = req.params.id;
        const targetDir = path.resolve(__dirname, `../../public/images/${userId}`);
        if (fs.existsSync(targetDir)) {

            // 如果該文件夾存在，則刪除所有內部文件，理論上最多只有3張
            console.log("File already exists");
        } else {
            fs.mkdir(targetDir, err => { console.log(err); });
        }
        cb(null, targetDir);
    },
    // destination: path.resolve(__dirname, "../../public/images"),
    filename: function (req, file, cb) {
        const date = new Date(req.body.timestamp);
        const timestamp = moment(date).format("YYYY-MM-DD"); //只取年月日
        const ext = file.mimetype.split("/")[1];
        const fileName = `${file.fieldname}-${timestamp}-${nanoid(5)}.${ext}`;

        cb(null, fileName);

        // 將檔案存儲位置暫時放置req，最後由路由返回給前端
        if (!(req.body.imgURL instanceof Array)) req.body.imgURL = [];
        req.body.imgURL.push(fileName);
    }
});
const upload = multer({ storage: storage });

// 導入情感模型
const FeelingModel = require('../../models/FeelingModel');

// 導入token較驗中間件
const { checkTokenMiddleware } = require("../../middleware/checkTokenMiddleware");

// 獲取特定用戶的一段日期/全部心情
router.get("/:id", checkTokenMiddleware, function (req, res) {
    const userId = req.params.id;
    const startTime = req.query.startTime; //api的query都會轉換成string
    const endTime = req.query.endTime; //api的query都會轉換成string
    // 獲取startTime 到 endTime 之間的心情
    if (startTime && endTime) {
        FeelingModel.findOne(
            { userId: userId }
        ).then((data) => {
            let periodFeeling = data.dailyFeeling.filter((item) => item.timestamp > startTime && item.timestamp < endTime);
            res.json({
                code: "2000",
                msg: "A period of feeling got!",
                data: periodFeeling
            });
        }).catch((err) => {
            res.json({
                code: "2001",
                msg: "User not exists",
                data: null
            });
        });
        return;
    }

    // 獲取所有日心情
    FeelingModel.findOne({ userId }).then((data) => {
        res.json({
            code: "2000",
            msg: "All feeling got!",
            data: data
        });
    }).catch((err) => {
        res.json({
            code: "2001",
            msg: "User not exists",
            data: null
        });
    });
});

// 新建特定日心情
router.post("/:id", checkTokenMiddleware, upload.array('imgURL', 3), function (req, res) {
    const userId = req.params.id;
    const timestamp = new Date(req.body.timestamp);
    req.body.timestamp = timestamp; // 限制只能存儲Date對象

    /* 高消耗寫法 */
    FeelingModel.findOne({ userId }).then((user) => {
        if (user) {
            // 用户存在，查找是否有匹配的timestamp
            const existingEntryIndex = user.dailyFeeling.findIndex(item => item.timestamp.toString() == timestamp.toString());
            if (existingEntryIndex !== -1) {
                user.dailyFeeling[existingEntryIndex] = { ...req.body };
            } else {
                let insertIndex = 0;
                const result = user.dailyFeeling.every((item, index) => {
                    if (item.timestamp.getTime() > timestamp.getTime()) {
                        insertIndex = index;
                        return false;
                    }
                    return true;
                });
                if (result) {
                    insertIndex = user.dailyFeeling.length;
                }
                user.dailyFeeling.splice(insertIndex, 0, { ...req.body });
            }
            // 保存更新后的用户数据
            user.save().then((data) => {
                res.json({
                    code: "2000",
                    msg: existingEntryIndex !== -1 ? "Feeling revised" : "New feeling created",
                    data: existingEntryIndex !== -1 ? data.dailyFeeling[existingEntryIndex] : data.dailyFeeling[0]
                });
            });
        } else {
            const newUser = new FeelingModel({
                userId,
                dailyFeeling: [{ ...req.body }]
            });
            newUser.save().then((data) => {
                res.json({
                    code: "2000",
                    msg: "New feeling created",
                    data: data.dailyFeeling[0]
                });
            });
        };
    }).catch((err) => {
        console.log(err);
        res.json({
            code: "5000",
            msg: err,
            data: null
        });
    });

    /* 原子寫法 但要遍歷兩次*/
    // FeelingModel.findOne(
    //     { userId, 'dailyFeeling.timestamp': timestamp }
    // ).then((data) => {
    //     if (data) {
    //         // 找到匹配的文档，不进行任何修改，直接结束操作
    //         res.json({
    //             code: "2000",
    //             msg: "Feeling already exists!",
    //             data
    //         });
    //     } else {
    //         // 未找到匹配的文档，执行更新操作
    //         FeelingModel.findOneAndUpdate(
    //             { userId },
    //             {
    //                 $push: {
    //                     'dailyFeeling': {
    //                         ...req.body
    //                     }
    //                 }
    //             },
    //             { upsert: true, new: true }
    //         ).then((updatedResult) => {
    //             res.json({
    //                 code: "2000",
    //                 msg: "New feeling created",
    //                 data: updatedResult
    //             });
    //         });
    //     }
    // }).catch((err) => {
    //     res.json({
    //         code: "5000",
    //         msg: err,
    //         data: null
    //     });
    // });

});

// 刪除特定日心情
router.delete("/:id/:feelingId", checkTokenMiddleware, function (req, res) {
    const userId = req.params.id;
    const feelingId = req.params.feelingId;
    FeelingModel.findOne({ userId }).then((user) => {
        if (user) {
            const existingEntryIndex = user.dailyFeeling.findIndex(item => item.id == feelingId);
            if (existingEntryIndex !== -1) {
                user.dailyFeeling.splice(existingEntryIndex, 1);
                user.save().then((data) => {
                    res.json({
                        code: "2000",
                        msg: "Feeling deleted!",
                        data: null
                    });
                });
            } else {
                res.json({
                    code: "2000",
                    msg: "Feeling not exists!",
                    data: null
                });
            }
        }
    }).catch((err) => {
        res.json({
            code: "2002",
            msg: "User not exists",
            data: null
        });
    });
});

module.exports = router;
