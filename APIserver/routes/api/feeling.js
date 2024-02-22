const express = require('express');
const router = express.Router();

// 導入用戶上傳圖片相關
const fs = require('fs');
const fsPromise = require('fs').promises;
const moment = require("moment");
const { nanoid } = require("nanoid");
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
    // 如果destination使用函數，則必須自己創建目標資料夾; 如果destination使用string，則multer會協助創建
    destination: async function (req, file, cb) {
        // 因為form.append的關係，前端回傳的時間格式為 string "2023-11-01T16:00:00.000Z"
        req.body.timestamp = new Date(req.body.timestamp); // 限制只能存儲Date對象

        const userId = req.params.id;
        const timestamp = moment(req.body.timestamp).format("YYYY-MM-DD"); //只取年月日
        const targetIdDir = path.resolve(__dirname, `../../public/images/${userId}`);
        const targetDayDir = path.resolve(__dirname, `../../public/images/${userId}/${timestamp}`);


        await fsPromise.mkdir(targetIdDir, { recursive: true }, { recursive: true });

        if (await fsPromise.stat(targetDayDir).catch(err => err.code !== 'ENOENT')) {
            // 如果該文件夾存在，則刪除所有內部文件，第一張照片進來時，先清理掉所有照片，並將clearPhoto設為true，表示舊照片清理完畢。第二張照片進來時，就不再清理照片。
            // if (!req.body.clearPhoto) {
            //     fs.readdirSync(targetDayDir).forEach((file) => {
            //         const curPath = path.join(targetDayDir, file);
            //         fs.unlinkSync(curPath);
            //         req.body.clearPhoto = true;
            //     });
            // }
        } else {
            fsPromise.mkdir(targetDayDir, { recursive: true });
        }
        cb(null, targetDayDir);
    },
    // destination: path.resolve(__dirname, "../../public/images"),
    filename: function (req, file, cb) {
        const date = req.body.timestamp;
        const userId = req.params.id;
        const timestamp = moment(date).format("YYYY-MM-DD"); //只取年月日
        const ext = file.mimetype.split("/")[1];
        const fileName = `${file.fieldname}-${timestamp}-${nanoid(5)}.${ext}`;

        cb(null, fileName);

        // 將檔案存儲位置暫時放置req，最後由路由返回給前端
        if (!(req.body.imgURL instanceof Array)) req.body.imgURL = [];
        req.body.imgURL.push(`http://127.0.0.1:3000/images/${userId}/${timestamp}/${fileName}`);
        req.body.addPhoto = true;
    }
});
const upload = multer({ storage: storage });

// 導入情感模型
const FeelingModel = require('@models/FeelingModel');

// 導入token較驗中間件
const { checkTokenMiddleware } = require("@middleware/checkTokenMiddleware");

// 獲取特定用戶的KOL, tags選項
// type為"tags", "KOL" 並且以,隔開。 如果為"",則代表回傳所有選項 
router.get("/:id/options", checkTokenMiddleware, async function (req, res) {
    try {
        const userId = req.params.id;
        const userData = await FeelingModel.findOne({ userId });
        if (!userData) throw new Error("User not exists");

        let data = {};
        let msg = "All options got";
        let type = req.query.type;

        if (type === "") {
            data = userData.options;
        } else {
            type = type?.split(",");
            type.forEach((type) => {
                if (userData.options[type]) {
                    data[type] = userData.options[type];
                }
            });
        };

        res.json({
            code: "2000",
            msg,
            data
        });
    } catch (err) {
        res.json({
            code: "4000",
            msg: err.message,
            data: null
        });
    }
});

// 新增特定用戶的KOL, tags選項，type為"tags", "KOL"
router.post("/:id/options/:type", checkTokenMiddleware, async function (req, res) {
    try {
        const userId = req.params.id;
        const type = req.params.type;
        let userData = await FeelingModel.findOne({ userId });
        if (!userData) userData = new FeelingModel({ userId });

        const data = req.body[type];
        userData.options[type].push(data);
        await userData.save();
        res.json({
            code: "2000",
            msg: "Options successfully updated!",
            data: null
        });
    } catch (err) {
        res.json({
            code: "4000",
            msg: err.message,
            data: null
        });
    }
});

// 獲取特定用戶的一段日期/全部心情
router.get("/:id", checkTokenMiddleware, async function (req, res) {
    try {
        // 前端回傳的時間格式 "1701273600000"
        const userId = req.params.id;
        const startTime = req.query.startTime; //api的query都會轉換成string
        const endTime = req.query.endTime; //api的query都會轉換成string

        if (startTime && endTime) {
            const data = await FeelingModel.findOne({ userId });

            if (!data) throw new Error("User not exists");
            const periodFeeling = data.dailyFeeling.filter((item) => item.timestamp >= startTime && item.timestamp <= endTime);
            res.json({
                code: "2000",
                msg: "A period of feeling got!",
                data: periodFeeling
            });
        } else {
            // 獲取所有日心情
            const data = await FeelingModel.findOne({ userId });
            if (!data) throw new Error("User not exists");
            res.json({
                code: "2000",
                msg: "All feeling got!",
                data: data
            });
        }
    } catch (err) {
        res.json({
            code: "4000",
            msg: err.message,
            data: null
        });
    }
});

// 新建/更新特定日心情
router.post("/:id", checkTokenMiddleware, upload.array('imgURL', 3), async function (req, res) {
    try {
        const userId = req.params.id;
        let timestamp = req.body.timestamp;
        timestamp = timestamp instanceof Date ? timestamp : new Date(timestamp); // 限制只能存儲Date對象

        const yearMonthDateTimestamp = moment(timestamp).format("YYYY-MM-DD"); //只取年月日
        const targetDayDir = path.resolve(__dirname, `../../public/images/${userId}/${yearMonthDateTimestamp}`);

        // 如果沒有imgURL，就清空圖片
        if (!req.body.imgURL) {
            try {
                await fsPromise.access(targetDayDir); //file 不存在的話，會throw error
                await fsPromise.rmdir(targetDayDir, { recursive: true });
            } catch (err) { }
        }

        // 沒經過muler處理 (沒有傳圖片但有傳imgURL)
        if (req.body.imgURL && !req.body.addPhoto) {

            // 只傳一個imgURL(http...)
            if (req.body.imgURL && !(req.body.imgURL instanceof Array)) {
                req.body.imgURL = [req.body.imgURL];
            }

            // 傳多個imgURL(http...) 
            const reserveList = req.body.imgURL.map((item) => {
                let newArr = item.split("/");
                return newArr[newArr.length - 1];
            });

            const files = await fsPromise.readdir(targetDayDir);
            for (const file of files) {
                if (!reserveList.includes(file)) {
                    const curPath = path.join(targetDayDir, file);
                    await fsPromise.unlink(curPath);
                }
            };
        }

        const user = await FeelingModel.findOne({ userId });

        // 用戶不存在
        if (!user) throw new Error("User not exists");

        // 用户存在，查找是否有匹配的timestamp
        const existingEntryIndex = user.dailyFeeling.findIndex(item => item.timestamp.toString() == timestamp.toString());
        let insertIndex = 0;
        if (existingEntryIndex !== -1) {
            user.dailyFeeling[existingEntryIndex] = { ...req.body };
        } else {
            /* 方法一: 手動排序插入，較少的元素操作，適合大型數據庫 */
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
            /* 方法二: 插入後調用mongodb的排序方法，較直觀，但多元素的操作，適合小數據庫 */
            // user.dailyFeeling.push({ ...req.body });
            // user.dailyFeeling.sort((a, b) => a.timestamp - b.timestamp);
        }
        const data = await user.save();
        return res.json({
            code: "2000",
            msg: existingEntryIndex !== -1 ? "Feeling revised" : "New feeling created",
            data: existingEntryIndex !== -1 ? data.dailyFeeling[existingEntryIndex] : data.dailyFeeling[insertIndex]
        });


        // 已於signup時自動創建feelingModel，故此處應不用特別做此動作
        // else {
        //     const newUser = await FeelingModel.createDefaultFeeling(userId);
        //     newUser.dailyFeeling = [{ ...req.body }];
        //     const data = await newUser.save();
        //     res.json({
        //         code: "2000",
        //         msg: "New feeling created",
        //         data: data.dailyFeeling[0]
        //     });
        // };
    } catch (err) {
        res.json({
            code: "5000",
            msg: err.message,
            data: null
        });
    }
});

// 刪除特定日心情
router.delete("/:id/:feelingId", checkTokenMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;
        const feelingId = req.params.feelingId;
        const user = await FeelingModel.findOne({ userId });

        // 用戶不存在
        if (!user) throw new Error("User not exists");

        const existingEntryIndex = user.dailyFeeling.findIndex(item => item.id == feelingId);
        if (existingEntryIndex !== -1) {
            // 刪除images
            let [{ timestamp }] = user.dailyFeeling.splice(existingEntryIndex, 1);
            await user.save();
            let yearMonthDateTimestamp = moment(timestamp).format("YYYY-MM-DD");
            const targetDayDir = path.resolve(__dirname, `../../public/images/${userId}/${yearMonthDateTimestamp}`);
            try {
                await fsPromise.access(targetDayDir); //file 不存在的話，會throw error
                await fsPromise.rmdir(targetDayDir, { recursive: true });
            } catch (err) { }
        }
        return res.json({
            code: "2000",
            msg: "Feeling deleted!",
            data: null
        });

    } catch (err) {
        res.json({
            code: "2002",
            msg: err.message,
            data: null
        });
    }
});

module.exports = router;
