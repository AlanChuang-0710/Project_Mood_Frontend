const express = require('express');
const router = express.Router();

// 導入用戶模型
const SettingModel = require("../../models/SettingModel");

// 導入token較驗中間件
const { checkTokenMiddleware } = require("../../middleware/checkTokenMiddleware");

// 獲取所有KOL/tags
router.get("/:id", checkTokenMiddleware, function (req, res) {
    let userId = req.params.id;
    SettingModel.findOne({ userId }).then((data) => {
        // 不管有沒有該userId都不會報錯，頂多回傳null
        res.json({
            code: "2000",
            msg: "Setting got!",
            data
        });
    }).catch((err) => {
        res.json({
            code: "5001",
            msg: "Sth wrong with db",
            data: null
        });
    });
});

// 新增 KOL/tags
router.post("/:id", checkTokenMiddleware, function (req, res) {
    const userId = req.params.id;
    const KOL = req.body.KOL;
    const tags = req.body.tags;

    SettingModel.findOne({ userId }).then((setting) => {
        // 找不到的話，會回傳null，故要做此判斷
        // 且save只有model實例對象才能使用
        if (!setting) {
            setting = new SettingModel({
                userId,
                KOL: [],
                tags: []
            });
        }
        if (setting.KOL.includes(KOL) || setting.tags.includes(tags)) {
            throw new Error(`${KOL} or ${tags} already exists`);
        }
        setting.KOL.push(KOL);
        setting.tags.push(tags);
        setting.save();
        return setting;
    }).then((data) => {
        res.json({
            code: "2000",
            msg: "Setting updated!",
            data
        });
    }).catch((err) => {
        res.json({
            code: "2002",
            msg: err.message,
            data: null
        });
    });
});

// 刪除KOL/tags
// 如果刪除KOL/tags是否會影響report的分析? 
// (刪除不影響，但單獨修改setting的tags會影響，故只開放用戶刪除後新增，不能修改!)
router.delete("/:id", checkTokenMiddleware, function (req, res) {
    const userId = req.params.id;
    const KOL = req.body.KOL || "";
    const tags = req.body.tags || "";
    SettingModel.findOne({ userId }).then((setting) => {
        if (setting !== null) {
            setting.KOL.every((item, index, setting) => {
                if (item === KOL) {
                    setting.splice(index, 1);
                    return false;
                }
                return true;
            });
            setting.tags.every((item, index, setting) => {
                if (item === tags) {
                    setting.splice(index, 1);
                    return false;
                }
                return true;
            });
        }

        return res.json({
            code: "2002",
            msg: `KOL or tags has been removed`,
            data: null
        });
    }).catch((err) => {
        res.json({
            code: "5000",
            msg: "Sth's wrong with db",
            data: null
        });
    });
});

module.exports = router;;
