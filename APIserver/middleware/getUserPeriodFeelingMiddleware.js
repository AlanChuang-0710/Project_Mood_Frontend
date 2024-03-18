// 導入心情模塊 
const FeelingModel = require("@models/FeelingModel");

module.exports = {
    getUserPeriodFeelingMiddleware: async (req, res, next) => {
        if (!req.query.startTime || !req.query.endTime) return res.json({
            code: 40000,
            msg: "參數缺失",
            data: null
        });

        const userId = req.params.id;
        const startTime = new Date(+req.query.startTime); //api的query都會轉換成string
        const endTime = new Date(+req.query.endTime); //api的query都會轉換成string

        const data = await await FeelingModel.findOne({
            userId
        }, {
            userId: 1,
            dailyFeeling: {
                $filter: {
                    input: "$dailyFeeling",
                    as: "feeling",
                    cond: {
                        $and: [
                            { $gte: ["$$feeling.timestamp", new Date(startTime)] },
                            { $lte: ["$$feeling.timestamp", new Date(endTime)] }
                        ]
                    }
                }
            }
        });

        if (!data) throw new Error("User not exists");

        // 獲得一段時間內的情緒資料
        req.periodFeeling = data.dailyFeeling;
        req.startTime = startTime;
        req.endTime = endTime;
        next();
    }
};