const jieba = require("@node-rs/jieba");
const fs = require("fs");
const path = require("path");

// 導入自定義/停用辭典
const deleteDict = fs.readFileSync("delete-word-dict.txt", "utf8").split("\n");
const userDict = fs.readFileSync(path.resolve(__dirname, "./dict.txt"));
jieba.loadDict(userDict);

const cut = jieba.cut("我隨時都感到不快樂，對任何事都提不起興趣。").filter((word) => !deleteDict.includes(word.keyword));;
const tag = jieba.tag("台北市長想要吃飯").filter((word) => !deleteDict.includes(word.keyword));
console.log(cut);
console.log(tag);


// 關鍵詞提取
const topN = 10;
const memo1 = "我身陷抑鬱當中，隨時都想要吃飯，對任何事物都沒有興趣且沮喪，沒有社交的慾望，有點想自殺。";
const memo2 = "今天是一個陰暗的秋日。早上散步時，遇到了許多老友，分享了許多歡樂時光。下午，我專注烤肉，同時有點工作抑鬱。傍晚，品味了美味的晚餐。今晚，準備閱讀一本新書，充實心靈。期待明天的新挑戰。";
const memo3 = "今天的天空依然陰沉，仿佛與我內心一樣。起床後，感到無力與沮喪。每一步都如千斤重，笑容已遠離。孤獨困擾，內心疲憊。但我知道，明天或許會更好。希望能夠找到一絲光明。";
const extract1 = jieba.extract(memo1, topN).filter((word) => !deleteDict.includes(word.keyword));
const extract2 = jieba.extract(memo2, topN).filter((word) => !deleteDict.includes(word.keyword));
const extract3 = jieba.extract(memo3, topN).filter((word) => !deleteDict.includes(word.keyword));
const bind = jieba.extract(memo2 + memo3, topN).filter((word) => !deleteDict.includes(word.keyword));

console.log(extract1);
console.log(extract2);
console.log(extract3);
console.log(bind);