import React, { useCallback } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import SVG from "react-inlinesvg";
import { analysis } from "@/assets/index";
import classes from "./AnalysisMsg.module.scss";
import { checkbox, info } from '@/assets/index';

const AnalysisMsg = ({ time, username, msg: { recordedCount, depressRatio, depressDay, volatility } }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const checkAnalysisMsg = useCallback(() => {
        open();
    }, [open]);
    const msgList = [
        `低潮日佔了所有記錄日的${depressRatio}%`,
        depressDay ? `${depressDay}比較容易低潮，可能${depressDay}存在讓您長期低潮的因素` : "今天星期幾跟您的心情並無顯著的關係",
        `心情波動約為${volatility}`
    ];
    const explainList = [
        "低潮日佔比超過10%，代表可能有抑鬱的傾向，請即時尋求幫助",
        "心情比例波動代表一段時間內心情起伏的狀態，當超過1.5，代表心情波動過大"
    ];
    return (
        <>
            <div className={classes.main} onClick={() => checkAnalysisMsg()}>
                <div style={{ width: "100%", }}>
                    <div className={classes.badge} >
                        Data Analysis
                    </div>
                    <div className={classes.photo}>
                        <SVG loader={<span>Loading...</span>} src={analysis} height="300px"></SVG>
                    </div>
                </div>
            </div >
            <Modal centered opened={opened} onClose={close} withCloseButton={false}>
                <div className={classes.modal}>
                    <p>過去一{time === "month" ? "個月" : "年中"}，{username}總共記錄了<span style={{}}>{recordedCount}</span>筆心情數據。</p>
                    <p>我們發現: </p>
                    <ul className={classes["msg-list"]}>
                        {msgList.map((item, index) => <li key={index}><SVG loader={<span>Loading...</span>} src={checkbox} height="20px"></SVG> {item}</li>)}
                    </ul>
                    <ul className={classes["explain-list"]}>
                        {explainList.map((item, index) => <li key={index}><SVG loader={<span>Loading...</span>} src={info} height="20px"></SVG> {item}</li>)}
                    </ul>
                </div>
            </Modal>
        </>
    );
};

export default AnalysisMsg;