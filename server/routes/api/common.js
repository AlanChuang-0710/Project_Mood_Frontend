// 引入 express
const express = require('express');
const router = express.Router();

const CommonModel = require('../../models/CommonModel');
const UserModel = require("../../models/UserModel");

// 導入token較驗中間件
const { checkTokenMiddleware } = require("../../middleware/checkTokenMiddleware");

// 獲取所有用戶通用的資料
router.get("/:id/:property", checkTokenMiddleware, async function (req, res) {
    const id = req.user.id;
    const property = req.params.property;

    // 從資料庫中確認用戶存在 並獲取common data
    // findById 或 findOne兩種寫法都ok，當使用findOne搜索id時，必須使用_id，否則找不到
    // UserModel.findOne({ _id: id }).then((data) => {

    const user = await UserModel.findById(id);
    if (user) {
        const data = await CommonModel.findOne();
        res.json({
            code: "2000",
            msg: "Common info got",
            data: { [property]: data[property] }
        });
    } else {
        res.json({
            code: "4040",
            msg: "User not found",
            data: null
        });
    }
});

// 僅限admin權限: 新建各類型用戶的通用資料 
// props 目前有essay, lesson
router.post("/:id", checkTokenMiddleware, async function (req, res) {
    let { propertyName, propertyData } = req.body;

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
});

// 僅限admin權限: 刪除各類型用戶的通用資料
// property 目前有lesson, essay
// lesson, essay元素的id
router.delete("/:id", checkTokenMiddleware, async function (req, res) {
    let { property, id } = req.body;
    let memberCommonData = await CommonModel.findOne();
    if (!memberCommonData) {
        return res.json({
            code: 4000,
            msg: `Common data not exists`,
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
});


module.exports = router;