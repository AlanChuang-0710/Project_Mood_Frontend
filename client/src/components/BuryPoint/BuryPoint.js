import React from "react";

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
        console.log(ele);
        console.log(bpId);
        // 回傳到後端邏輯
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

    function findHtmlElement(ele) {
        if (typeof ele.type === 'function') {
            if (ele.type.prototype instanceof React.Component) {
                ele = new ele.type(ele.props).render();
            } else {
                ele = ele.type(ele.props);
            }
        }
        if (typeof ele.type === 'string') {
            return AddClickEvent(ele);
        }
        return React.cloneElement(ele, {
            children: findHtmlElement(ele.props.children)
        });
    }

    return findHtmlElement(React.Children.only(children));
}