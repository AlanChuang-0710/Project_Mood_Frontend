/**
 * 此文件用於統一配置專案顏色
 * 
 * brand: 代表主題色
 * emotion: 代表各種情緒
 * light: 代表白天模式下的白色背景
 * night: 代表夜晚模式下的深藍背景
 * tool: 代表小工具的背景顏色
 * button: 代表按鈕的顏色
 */
let globalColor = { 
    brand: ["#6a6cff", "#09c0e8", "#73db3d", "#f7e048"], // 藍  青藍 青綠 淡橘黃
    emotion: ["#d12a2f", "#d65b37", "#fbae43", "#8fc962", "#3ab34c", "#A9A9A9"], // 共六種: 5情緒顏色(排序:憂鬱到開心)+1無紀錄顏色
    light: ["#fff"], // 0是白色背景 
    night: ["#2b2c40"], // 0是深藍背景 
    tool: ["#717b8a", "#9BA2AD"], // 0是灰色 用於工具 1是淺灰 用於日曆
    mood: [],
    button: ["#e7f5ff", "#33486B"] //0是light下btn的顏色，1是dark下btn的顏色
};

export default globalColor;