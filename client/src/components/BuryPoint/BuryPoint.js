import React from "react";
import { isDesktop, isMobile, isAndroid, isIOS } from 'react-device-detect';

// 判斷用戶使用裝置
function checkAgent() {
    if (isDesktop) return "desktop";
    if (isMobile) {
        if (isAndroid) return "android";
        if (isIOS) return "IOS";
        return "other_mobile";
    }
}

const userAgent = checkAgent();

/**
 * 點擊埋點
 * @param {props} :Single React Node
 * @returns null
 */
export default function TrackerClick({
    name,
    extra,
    immediate,
    bpId,
    children,
}) {
    const handleClick = (ele) => {
        // 回傳到後端邏輯
        let bpEvent = {
            bpId: bpId, //事件ID
            userId: "", //用戶ID
            type: "click", //click, view
            timestamp: Date.now(), //事件觸發時間
            source: userAgent, //用戶desktop, IOS, android
        };
    };

    function AddClickEvent(ele) {
        return React.cloneElement(ele, {
            onClick: (e) => {
                const originClick = ele.props.onClick || function () { };
                originClick.call(ele, e);
                handleClick(ele);
            }
        });
    }

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
    return AddClickEvent(React.Children.only(children));
}