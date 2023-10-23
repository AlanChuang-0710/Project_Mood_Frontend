// 引入 express
const express = require('express');
const router = express.Router();

// 導入情感模型
const CommonModel = require('../../models/CommonModel');
// 導入用戶模型
const UserModel = require("../../models/UserModel");

// 導入token較驗中間件
const { checkTokenMiddleware } = require("../../middleware/checkTokenMiddleware");

// 獲取所有用戶通用的資料
router.get("/:id", checkTokenMiddleware, function (req, res) {
    const id = req.user.id;
    const property = req.body.property;

    // 從資料庫中確認用戶存在 並獲取common data
    // findById 或 findOne兩種寫法都ok，當使用findOne搜索id時，必須回歸使用_id，否則找不到
    // UserModel.findOne({ _id: id }).then((data) => {
    UserModel.findById(id).then(() => {
        CommonModel.findOne().then((data) => {
            res.json({
                code: "2000",
                msg: "Common info got",
                data: { [property]: data[property] }
            });
        });
    });

});

// 僅限admin權限: 新建各類型用戶的通用資料 
// props 目前有essay, lesson
router.post("/:id", checkTokenMiddleware, async function (req, res) {
    let { propertyName, propertyData } = req.body;

    try {
        let memberCommonData = await CommonModel.findOne();

        // findOne找不到返回null find找不到返回[]
        if (!memberCommonData) {
            const common = new CommonModel({ [propertyName]: propertyData });
            await common.save();
        } else {
            propertyData.forEach((item) => memberCommonData[propertyName].push(item));
            await memberCommonData.save();
        }
        res.json({
            code: "2000",
            msg: "Common info Updated",
            data: null
        });
    } catch (err) {
        res.json({
            code: "5000",
            msg: err,
            data: null
        });
    }
});

// 僅限admin權限: 刪除各類型用戶的通用資料
// property 目前有lesson, essay
// lesson, essay元素的id
router.delete("/:id", checkTokenMiddleware, async function (req, res) {
    try {
        let { property, id } = req.body;
        let memberCommonData = await CommonModel.findOne();
        if (!memberCommonData) {
            return res.json({
                code: 2001,
                msg: `Sth's wrong!`,
                data: null
            });
        }
        memberCommonData[property].every((item, index, array) => {
            if (item.id === id) {
                array.splice(index, 1);
                return false;
            }
            return true;
        });
        res.json({
            code: 2000,
            msg: "Common data deleted",
            data: null
        });
        memberCommonData.save();
    } catch (err) {
        res.json({
            code: 5000,
            msg: err,
            data: null
        });
    }
});


module.exports = router;