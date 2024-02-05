import React, { useState } from "react";
import { isDesktop, isMobile, isAndroid, isIOS } from 'react-device-detect';
import { useInView } from 'react-intersection-observer';

// 判斷用戶使用裝置
function checkAgent() {
    if (isDesktop) return "desktop";
    if (isMobile) {
        if (isAndroid) return "android";
        if (isIOS) return "IOS";
        return "other_mobile";
    }
}

// 用戶通用數據
const source = checkAgent();
const { accessToken, id: userId } = JSON.parse(sessionStorage.getItem("userInfo"));

// 上報對列
let reportQuene = { userId, accessToken, source, bp: [] };

// 上報函數
const reportFn = () => {
    // 判斷用戶環境是否支持navigator.sendBeacon
    if (reportQuene.bp.length === 0) return;
    if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(reportQuene)], { type: 'application/json' });
        navigator.sendBeacon("http://127.0.0.1:3002/admin/event", blob);
    } else {
        let image = new Image();
        image.width = 1;
        image.height = 1;
        image.src = "http://127.0.0.1:3002/admin/event?" + JSON.stringify(reportQuene);
    }
    reportQuene.bp = [];
};

// 用戶導航到新頁面、切換標籤頁、關閉標籤頁、最小化、關閉瀏覽器時觸發上報函數
window.addEventListener("visibilitychange", (e) => {
    if (document.visibilityState === "hidden") reportFn();
});

// 傳送到上報對列
const handleReport = (bp_id, timestamp, otherInfo) => {
    // 回傳到後端邏輯
    let bpEvent = {
        bp_id, //事件ID
        timestamp, //事件觸發時間
    };
    reportQuene.bp.push(bpEvent);

    // 上報對列超過10個，合併發送API
    if (reportQuene.bp.length > 10) {
        reportFn();
    }
};

// 綁定點擊
function AddClickEvent(ele, bpId) {
    return React.cloneElement(ele, {
        onClick: (e) => {
            const originClick = ele.props.onClick || function () { };
            originClick.call(ele, e);
            handleReport(bpId, Date.now(),);
        }
    });
}

// 綁定觀察 (單次觀察超過六秒才會上報)
function AddViewEvent(ele, bpId) {
    let [viewstart, setViewstart] = useState(null);
    let [timer, setTimer] = useState(null);
    const { ref } = useInView({
        /* Optional options */
        // 配置詳見 https://www.npmjs.com/package/react-intersection-observer#options
        threshold: 1,
        onChange(inView, entry) {
            if (inView) {
                let now = Date.now();
                setTimer(setTimeout(() => { handleReport(bpId, now, now - viewstart); }, 6000));
                setViewstart((preVal) => Date.now());
            } else {
                clearTimeout(timer);
                setViewstart((preVal) => null);
            }
        }
    });

    return (
        <div ref={ref}>
            {ele}
        </div>
    );
}

/**
 * 埋點HOC參數
 * @param {props} :Single React Node
 * @param {bpId} :埋點事件唯一代號
 * @param {children} :Tracker組件包裹的唯一子組件
 * @param {type} :Tracker組件追蹤的事件
 * @returns null
 */
export default function Tracker({
    type,
    // extra,
    // immediate,
    bpId,
    children,
}) {
    if (!type || !bpId || !children) return console.error("Props should specify type, bpId and contain an only children");
    // function findHtmlElement(ele) {
    //     // 如果包裹的是組件
    //     if (typeof ele.type === 'function') {
    //         if (ele.type.prototype instanceof React.Component) {
    //             ele = new ele.type(ele.props).render();
    //         } else {
    //             ele = ele.type(ele.props);
    //         }
    //     }

    //     // 如果包裹的是原生DOM
    //     if (typeof ele.type === 'string') {
    //         return AddClickEvent(ele);
    //     }
    //     return React.cloneElement(ele, {
    //         children: findHtmlElement(ele.props.children)
    //     });
    // }

    // 限定傳入的數據最外層只能有一個container
    if (type === "click") { return AddClickEvent(React.Children.only(children), bpId); }
    else if (type === "view") { return AddViewEvent(React.Children.only(children), bpId); };
}