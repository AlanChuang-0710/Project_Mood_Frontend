// 引入express
const express = require("express");
const router = express.Router();

// 導入結巴
const jieba = require("@node-rs/jieba");

// 導入自定義/停用辭典
const fs = require("fs");
const path = require("path");
const deleteDict = fs.readFileSync(path.resolve(__dirname, "../../jieba/delete-word-dict.txt"), "utf8").split("\n");
const userDict = fs.readFileSync(path.resolve(__dirname, "../../jieba/dict.txt"));
jieba.loadDict(userDict);

// 導入toekn較驗中間件
const { checkTokenMiddleware } = require("../../middleware/checkTokenMiddleware");
const { getUserPeriodFeelingMiddleware } = require("../../middleware/getUserPeriodFeelingMiddleware");

// 獲取一段時間內score pie chart
router.get("/:id/score_pie_chart", checkTokenMiddleware, getUserPeriodFeelingMiddleware, async function (req, res) {
    try {
        // 透過中間件獲取特定時間段的情緒
        const { startTime, endTime, periodFeeling } = req;

        // 將原始數組轉換為一個Map，其中日期作為鍵
        const dataMap = new Map();
        periodFeeling.forEach(item => {
            dataMap.set(item.timestamp.toISOString().split('T')[0], item);
        });

        // 遍歷日期範圍，檢查每一天是否在數組中，如果不在則添加一個對象
        const result = [];
        for (let date = startTime; date <= endTime; date.setDate(date.getDate() + 1)) {
            const isoDate = date.toISOString().split('T')[0];
            if (dataMap.has(isoDate)) {
                result.push(dataMap.get(isoDate));
            } else {
                // 如果日期不在數組中，則添加一個新的對象
                result.push({
                    timestamp: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                    score: null,
                });
            }
        };

        // score pie chart
        const scoreArray = [-2, -1, 0, 1, 2, null];
        const data = scoreArray.map((score) => {
            const scoreArrLength = result.filter((feeling) => feeling.score === score).length;
            // let value = scoreArrLength !== 0 ? +((scoreArrLength / result.length) * 100).toFixed(1) : 0;
            return {
                count: scoreArrLength,
                score,
            };
        }
        );

        res.json({
            code: "2000",
            msg: "Score pie chart data got",
            data: {
                total: result.length,
                data
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// 獲取一段時間內score day bar (各星期 score比例)
router.get("/:id/score_day_bar", checkTokenMiddleware, getUserPeriodFeelingMiddleware, async function (req, res) {
    try {
        // 透過中間件獲取特定時間段的情緒
        const { startTime, endTime, periodFeeling } = req;

        // 將原始數組轉換為一個Map，其中日期作為鍵
        const dataMap = new Map();
        periodFeeling.forEach(item => {
            dataMap.set(item.timestamp.toISOString().split('T')[0], item);
        });

        // 遍歷日期範圍，檢查每一天是否在數組中，如果不在則添加一個對象
        const result = [];
        for (let date = startTime; date <= endTime; date.setDate(date.getDate() + 1)) {
            const isoDate = date.toISOString().split('T')[0];
            if (dataMap.has(isoDate)) {
                result.push(dataMap.get(isoDate));
            } else {
                // 如果日期不在數組中，則添加一個新的對象
                result.push({
                    timestamp: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                    score: null,
                });
            }
        };

        // 切分出各day的情緒
        const dayArray = { day0: [], day1: [], day2: [], day3: [], day4: [], day5: [], day6: [] };
        result.forEach((item, index) => {
            switch (index % 7) {
                case 0:
                    dayArray.day0.push(item);
                    break;
                case 1:
                    dayArray.day1.push(item);
                    break;
                case 2:
                    dayArray.day2.push(item);
                    break;
                case 3:
                    dayArray.day3.push(item);
                    break;
                case 4:
                    dayArray.day4.push(item);
                    break;
                case 5:
                    dayArray.day5.push(item);
                    break;
                case 6:
                    dayArray.day6.push(item);
                    break;
                default:
            }
        });

        // 計算各day的score占比
        const scoreArray = [-2, -1, 0, 1, 2, null];
        for (let prop in dayArray) {
            dayArray[prop] = scoreArray.map((score) => dayArray[prop].filter((item) => item.score === score).length);
        };

        let newArr = [];
        scoreArray.forEach((item, index) => {
            for (let prop in dayArray) {
                if (!newArr[index]) newArr[index] = [];
                newArr[index].push(dayArray[prop][index]);
            }
        });

        res.json({
            code: "2000",
            msg: "Score day bar data got",
            data: {
                total: result.length,
                data: newArr
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// 獲取一段時間內score line chart
router.get("/:id/score_line_chart", checkTokenMiddleware, getUserPeriodFeelingMiddleware, async function (req, res) {
    try {
        // 透過中間件獲取特定時間段的情緒
        const { startTime, endTime, periodFeeling } = req;

        // 將原始數組轉換為一個Map，其中日期作為鍵
        const dataMap = new Map();
        periodFeeling.forEach(item => {
            dataMap.set(item.timestamp.toISOString().split('T')[0], { timestamp: item.timestamp, score: item.score });
        });

        // 遍歷日期範圍，檢查每一天是否在數組中，如果不在則添加一個對象
        const result = [];
        for (let date = startTime; date <= endTime; date.setDate(date.getDate() + 1)) {
            const isoDate = date.toISOString().split('T')[0];
            if (dataMap.has(isoDate)) {
                result.push(dataMap.get(isoDate));
            } else {
                // 如果日期不在數組中，則添加一個新的對象
                result.push({
                    timestamp: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                    score: null,
                });
            }
        };

        res.json({
            code: "2000",
            msg: "Score line chart data got",
            data: result
        });
    } catch (err) {
        console.log(err);
    }
});

// 獲取一段時間內sleep line chart
router.get("/:id/sleep_line_chart", checkTokenMiddleware, getUserPeriodFeelingMiddleware, async function (req, res) {
    try {
        // 透過中間件獲取特定時間段的情緒
        const { startTime, endTime, periodFeeling } = req;

        // 將原始數組轉換為一個Map，其中日期作為鍵
        const dataMap = new Map();
        periodFeeling.forEach(item => {
            dataMap.set(item.timestamp.toISOString().split('T')[0], { timestamp: item.timestamp, sleep: item.sleep });
        });

        // 遍歷日期範圍，檢查每一天是否在數組中，如果不在則添加一個對象
        const result = [];
        for (let date = startTime; date <= endTime; date.setDate(date.getDate() + 1)) {
            const isoDate = date.toISOString().split('T')[0];
            if (dataMap.has(isoDate)) {
                result.push(dataMap.get(isoDate));
            } else {
                // 如果日期不在數組中，則添加一個新的對象
                result.push({
                    timestamp: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                    sleep: null,
                });
            }
        };

        res.json({
            code: "2000",
            msg: "Sleep line chart data got",
            data: result
        });
    } catch (err) {
        console.log(err);
    }
});

// 獲取一段時間內5種score top5 KOL
router.get("/:id/kol_score_chart", checkTokenMiddleware, getUserPeriodFeelingMiddleware, async function (req, res) {
    try {

        // 透過中間件獲取特定時間段的情緒
        const periodFeeling = req.periodFeeling;

        // 提取出所有kol
        const allKOLArray = periodFeeling.reduce((accumulator, item) => {
            return accumulator.concat(item.KOL);
        }, []);

        // 計算重複次數
        const countMap = {};
        allKOLArray.forEach((item) => {
            if (countMap[item]) {
                countMap[item]++;
            } else {
                countMap[item] = 1;
            }
        });
        let sortedCounts = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
        sortedCounts = sortedCounts.map((item) => {
            const result = {};
            result[item[0]] = item[1];
            return result;
        });
        res.json({
            code: 2000,
            msg: "Sleep line chart data got",
            data: sortedCounts
        });
    } catch (err) {
        console.log(err);
    }
});

// 獲取一段時間內5種score top5 tag
router.get("/:id/tags_score_chart", checkTokenMiddleware, getUserPeriodFeelingMiddleware, async function (req, res) {
    try {
        // 透過中間件獲取特定時間段的情緒
        const periodFeeling = req.periodFeeling;

        // 提取出所有kol
        const allKOLArray = periodFeeling.reduce((accumulator, item) => {
            return accumulator.concat(item.tags);
        }, []);

        // 計算重複次數
        const countMap = {};
        allKOLArray.forEach((item) => {
            if (countMap[item]) {
                countMap[item]++;
            } else {
                countMap[item] = 1;
            }
        });
        let sortedCounts = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
        sortedCounts = sortedCounts.map((item) => {
            const result = {};
            result[item[0]] = item[1];
            return result;
        });
        res.json({
            code: 2000,
            msg: "Sleep line chart data got",
            data: sortedCounts
        });
    } catch (err) {
        console.log(err);
    }
});

// 獲取一段時間內 dream 高頻出現的詞彙 (雲圖 和 高頻詞)
router.get("/:id/dream_keyword_chart", checkTokenMiddleware, getUserPeriodFeelingMiddleware, async function (req, res) {
    try {
        // 透過中間件獲取特定時間段的情緒
        const periodFeeling = req.periodFeeling;

        // 提取出所有dream
        const dreamString = periodFeeling.reduce((accumulator, item) => {
            return accumulator + item.dream;
        }, "");

        // 選擇jieba提取出來的top詞數量
        const topN = 100;
        let extractKeyword = jieba.extract(dreamString, topN).filter((word) => !deleteDict.includes(word.keyword));
        const keywords = extractKeyword.map((item) => {
            let target = new RegExp(item.keyword, 'g');
            const matches = dreamString.match(target);
            return { name: item.keyword, value: matches ? matches.length : 0 };
        });
        // const keywords = extractKeyword.map((item) => ({ name: item.keyword, value: parseInt(item.weight * 1000) }));

        res.json({
            code: 2000,
            msg: "Keywords Frequently Occurred in Dreams got!",
            data: keywords
        });
    } catch (err) {
        console.log(err);
    }
});

// 獲取一段時間內 心情筆記 高頻出現的詞彙
router.get("/:id/memo_keyword_chart", checkTokenMiddleware, getUserPeriodFeelingMiddleware, async function (req, res) {
    try {
        // 透過中間件獲取特定時間段的情緒
        const periodFeeling = req.periodFeeling;

        // 提取出所有dream
        const memoString = periodFeeling.reduce((accumulator, item) => {
            return accumulator += item.memo;
        }, "");
        // 選擇jieba提取出來的top詞數量
        const topN = 5;
        const extractKeyword = jieba.extract(memoString, topN).filter((word) => !deleteDict.includes(word.keyword));
        const keywords = extractKeyword.map((item) => item.keyword);

        res.json({
            code: 2000,
            msg: "Keywords Frequently Occurring in Memo got!",
            data: keywords
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;