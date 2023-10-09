import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { useMantineTheme, } from "@mantine/core";

const ScoreFlowChart = () => {
    const theme = useMantineTheme();
    const scoreFlowDOM = useRef(null);
    const [scoreFlowChart, setScoreFlowChart] = useState(null);
    const handleResize = () => scoreFlowChart?.resize();
    const option = {
        title: {
            text: "Mood Flow",
            show: true,
            left: "center",
            right: "center",
            // color: theme.colorScheme === "light" ? "#333332" : theme.colors.brand[1]
            color: "white"
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: "#aaabb3"
                },
            },
            axisLabel: {
                color: "#4e4a4a",
            },
            offset: 2,
        },
        yAxis: {
            type: 'value'
        },
        grid: {
            top: "35px",
            left: "2px",
            right: "2px",
            bottom: "15px",
            containLabel: true
        },
        series: [
            {
                data: [1, 2, -1, -2, 0, 1, 1],
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: "#4e4a4a"
                },
                itemStyle: {
                    color: "#4e4a4a"
                },
            }
        ]
    };

    useEffect(() => {
        if (!scoreFlowChart) {
            // 此處極為重要，目的是避免DOM尚未被渲染就執行init，會出現頁面不顯示圖表，且控制台報錯的問題:
            // Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight.
            setTimeout(() => {
                setScoreFlowChart(echarts.init(scoreFlowDOM.current));
            }, 100);
        }
        scoreFlowChart?.setOption(option);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [option, handleResize]);

    return (
        <div ref={scoreFlowDOM} style={{ height: "200px" }}></div>
    );
};

export default ScoreFlowChart;