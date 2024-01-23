const mongoose = require("mongoose");

// 存放所有使用者通用的資料
const EssaySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    tags: {
        type: Array, //all, depression, inspiration
        default: ["all"],
        required: true
    },
    membership: {
        type: [{
            type: String,
            enum: ["free", "common", "vip"]
        }],
    },
});

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    tags: {
        type: Array, //all, depression, inspiration
        default: ["all"],
        required: true
    },
    price: {
        type: String,
        required: true
    },
    membership: {
        type: [{
            type: String,
            enum: ["free", "common", "vip"]
        }],
    },
});

const CommonSchema = new mongoose.Schema({
    essay: {
        type: [EssaySchema]
    },
    lesson: {
        type: [LessonSchema]
    },
});

// 創建模型對象，對文檔操作的封裝對象 mongoose會自動以 複數名稱 創建集合
const CommonModel = mongoose.model("commons", CommonSchema);

//暴露模型對象
module.exports = CommonModel;