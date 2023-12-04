// 引入express
const express = require("express");
const router = express.Router();

const moment = require("moment");

// 導入結巴
const jieba = require("@node-rs/jieba");

// 導入自定義/停用辭典
const fs = require("fs");
const path = require("path");
const deleteDict = fs.readFileSync(path.resolve(__dirname, "../../jieba/delete-word-dict.txt"), "utf8").split("\r\n");
deleteDict.push('\r\n');
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

        // 確認日期屬於星期幾 (這件任務理應當放在前端，讓前端依據本地時間進行判斷，但此專案暫先不考慮跨時區問題)
        const dayMapping = { "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6 };

        // 切分出各day的情緒 規定day0必須是星期日
        const dayArray = { Sunday: [], Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [] };
        result.forEach((item, index) => {
            switch (dayMapping[moment(item.timestamp).format("dddd")] % 7) {
                case 0:
                    dayArray.Sunday.push(item);
                    break;
                case 1:
                    dayArray.Monday.push(item);
                    break;
                case 2:
                    dayArray.Tuesday.push(item);
                    break;
                case 3:
                    dayArray.Wednesday.push(item);
                    break;
                case 4:
                    dayArray.Thursday.push(item);
                    break;
                case 5:
                    dayArray.Friday.push(item);
                    break;
                case 6:
                    dayArray.Saturday.push(item);
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
                barData: newArr,
                dayData: dayArray
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

        const allKOLArray = periodFeeling.reduce((accumulator, item) => {
            accumulator[`score${item.score}`] = accumulator[`score${item.score}`].concat(item.KOL);
            return accumulator;
        }, {
            score0: [],
            score1: [],
            score2: [],
            "score-1": [],
            "score-2": [],
        });

        for (const score in allKOLArray) {
            const countMap = {};
            allKOLArray[score].forEach((kol) => {
                if (countMap[kol]) {
                    countMap[kol]++;
                } else {
                    countMap[kol] = 1;
                }
            });

            let sortedCounts = Object.entries(countMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
            allKOLArray[score] = sortedCounts;
        }

        // {
        //     score0: [],
        //     score1: [ [ 'Parent', 1 ], [ 'Alan', 1 ] ],
        //     score2: [ [ 'Sibling', 3 ], [ 'Myself', 3 ], [ 'Parent', 2 ], [ 'Alan', 1 ] ],
        //     'score-1': [],
        //     'score-2': [ [ 'Sibling', 1 ], [ 'Myself', 1 ] ]
        // }

        res.json({
            code: 2000,
            msg: "Top 5 highly-associated KOL got",
            data: allKOLArray
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

        const allTagsArray = periodFeeling.reduce((accumulator, item) => {
            accumulator[`score${item.score}`] = accumulator[`score${item.score}`].concat(item.tags);
            return accumulator;
        }, {
            score0: [],
            score1: [],
            score2: [],
            "score-1": [],
            "score-2": [],
        });

        for (const score in allTagsArray) {
            const countMap = {};
            allTagsArray[score].forEach((tags) => {
                if (countMap[tags]) {
                    countMap[tags]++;
                } else {
                    countMap[tags] = 1;
                }
            });

            let sortedCounts = Object.entries(countMap).sort((a, b) => b[1] - a[1]).slice(0, 5);;
            allTagsArray[score] = sortedCounts;
        }

        // {
        //     score0: [],
        //     score1: [ [ 'Parent', 1 ], [ 'Alan', 1 ] ],
        //     score2: [ [ 'Sibling', 3 ], [ 'Myself', 3 ], [ 'Parent', 2 ], [ 'Alan', 1 ] ],
        //     'score-1': [],
        //     'score-2': [ [ 'Sibling', 1 ], [ 'Myself', 1 ] ]
        // }

        res.json({
            code: 2000,
            msg: "Top 5 highly-associated Tags got",
            data: allTagsArray
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
        // fs.writeFileSync(path.resolve(__dirname, "./delete.txt"), deleteDict.join(""));
        let extractKeyword = jieba.extract(dreamString, topN).filter((word) => !deleteDict.includes(word.keyword));
        const keywords = extractKeyword.map((item) => {
            let target = new RegExp(item.keyword, 'g');
            const matches = dreamString.match(target);
            return { name: item.keyword, value: matches ? matches.length : 0, weight: item.weight.toFixed(4) };
        });

        res.json({
            code: 2000,
            msg: "Keywords Frequently Occurred in Dreams got!",
            data: keywords
        });
    } catch (err) {
        console.log(err);
    }
});

// 獲取一段時間內 心情筆記 高頻出現的詞彙 (高頻詞)
router.get("/:id/memo_keyword_chart", checkTokenMiddleware, getUserPeriodFeelingMiddleware, async function (req, res) {
    try {
        // 透過中間件獲取特定時間段的情緒
        const periodFeeling = req.periodFeeling;

        // 提取出所有memo
        const memoString = periodFeeling.reduce((accumulator, item) => {
            return accumulator += item.memo;
        }, "");

        // 選擇jieba提取出來的top詞數量
        const topN = 20;
        let extractKeyword = jieba.extract(memoString, topN).filter((word) => !deleteDict.includes(word.keyword));
        const keywords = extractKeyword.map((item) => {
            let target = new RegExp(item.keyword, 'g');
            const matches = memoString.match(target);
            return { name: item.keyword, value: matches ? matches.length : 0, weight: item.weight.toFixed(4) };
        });

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