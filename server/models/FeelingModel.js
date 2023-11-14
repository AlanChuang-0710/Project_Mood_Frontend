const mongoose = require("mongoose");

// 設置集合中 文檔的屬性及屬性值
const DailyFeelingSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
        index: 1
    },
    score: {
        type: Number,
        required: true,
    },
    tags: {
        type: Array,
        required: true
    },
    sleep: {
        type: Number,
        required: true,
    },
    dream: {
        type: String
    },
    KOL: {
        type: Array
    },
    imgURL: {
        type: Array,
    },
    memo: {
        type: String
    }
});

const FeelingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    dailyFeeling: [DailyFeelingSchema]
});

// 創建模型對象，對文檔操作的封裝對象 mongoose會自動以 複數名稱 創建集合
const FeelingModel = mongoose.model("feelings", FeelingSchema);

//暴露模型對象
module.exports = FeelingModel;