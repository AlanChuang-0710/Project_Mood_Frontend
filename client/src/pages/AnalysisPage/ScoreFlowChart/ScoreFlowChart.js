import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import moment from "moment";
// import { useMantineTheme, } from "@mantine/core";

const ScoreFlowChart = ({ height, scoreFlowChartData }) => {
    // const theme = useMantineTheme();
    const scoreFlowDOM = useRef(null);
    const [scoreFlowChart, setScoreFlowChart] = useState(null);


    useEffect(() => {
        let dataArray;
        let timestampArray;
        let option;
        if (scoreFlowChartData) {
            dataArray = scoreFlowChartData.data.map((item) => ({ value: item.score, ...item }));
            timestampArray = scoreFlowChartData.data.map((item) => moment(item.timestamp).format('YYYY-MM-DD'));
            option = {
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
                    data: timestampArray,
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
                axisPointer: [
                    {
                        label: {
                            color: "#fff",
                            show: true,
                            formatter: null,
                            precision: "auto",
                            margin: 3,
                        },
                    },
                ],
                tooltip: {
                    trigger: "axis",
                    confine: true,
                    position: function (pt) {
                        let x = pt[0] + 15 + "px";
                        let y = pt[1] - 25 + "px";
                        return [x, y];
                    },
                    formatter: (params) => {
                        console.log(params);
                        return `<div style="width: 150px">
                        <div style="display: flex; justify-content: space-between">
                        <div style="float: left">Date</div>
                        <div style="float: right">${params[0].axisValue}</div>
                            </div>
                        <div >
                            <div>
                            <div style="float: left">Score</div>
                            <div style="float: right">${params[0].data.score ? params[0].data.score : "No record"}</div>
                            </div>
                            </div>
                        </div>`;
                    },
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
                        data: dataArray,
                        type: 'line',
                        smooth: true,
                        // 控制value為null時，是否斷開連線
                        // connectNulls: false,
                        // 折線線條
                        lineStyle: {
                            color: "#4e4a4a",
                        },
                        // 折線數據點
                        itemStyle: {
                            color: "transparent",
                            borderWidth: 0,
                        },
                    }
                ]
            };
        }
        if (!scoreFlowChart) {
            // 此處極為重要，目的是避免DOM尚未被渲染就執行init，會出現頁面不顯示圖表，且控制台報錯的問題:
            // Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight.
            setTimeout(() => {
                setScoreFlowChart(echarts.init(scoreFlowDOM.current));
            }, 100);
        }
        scoreFlowChart?.setOption(option);
        const handleResize = () => scoreFlowChart?.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [scoreFlowChart, scoreFlowChartData]);

    return (
        <div ref={scoreFlowDOM} style={{ height: height + "px" }}></div>
    );
};

export default ScoreFlowChart;