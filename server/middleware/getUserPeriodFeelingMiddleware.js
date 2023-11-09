// 導入心情模塊 
const FeelingModel = require("../models/FeelingModel");

module.exports = {
    getUserPeriodFeelingMiddleware: async (req, res, next) => {
        if (!req.query.startTime || !req.query.endTime) {
            return res.json({
                code: "4000",
                msg: "參數缺失",
                data: null
            });
        }
        try {
            const userId = req.params.id;
            const startTime = new Date(+req.query.startTime); //api的query都會轉換成string
            const endTime = new Date(+req.query.endTime); //api的query都會轉換成string

            // 獲得該用戶所有資料
            const user = await FeelingModel.findOne({ userId });

            if (!user) {
                return res.json({
                    code: "4000",
                    msg: `User not exists`,
                    data: null
                });
            }

            // 獲得一段時間內的情緒資料
            const periodFeeling = user.dailyFeeling.filter((item) => item.timestamp >= startTime && item.timestamp <= endTime);
            req.periodFeeling = periodFeeling;
            req.startTime = startTime;
            req.endTime = endTime;
            next();
        } catch (err) {
            return res.json({
                code: "5000",
                msg: err,
                data: null
            });
        }
    }
};