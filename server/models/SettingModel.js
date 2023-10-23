const mongoose = require("mongoose");

// 設置集合中 文檔的屬性及屬性值
let Setting = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    KOL: {
        type: Array,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
},
    { versionKey: false } // 不需要紀錄document更動版本
    // { timestamps: true } //此處沒必要紀錄創建、更新時間
);

// 創建模型對象，對文檔操作的封裝對象 mongoose會自動以 複數名稱 創建集合
let SettingModel = mongoose.model("settings", Setting);

//暴露模型對象
module.exports = SettingModel;