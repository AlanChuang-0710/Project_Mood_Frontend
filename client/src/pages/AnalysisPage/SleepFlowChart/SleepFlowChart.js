import React, { useState, useRef, useEffect } from 'react';
import { useMantineTheme, } from "@mantine/core";
import * as echarts from 'echarts';
import moment from 'moment';

const SleepFlowChart = ({ height, sleepFlowChartData }) => {
    const theme = useMantineTheme();
    const sleepFlowDOM = useRef(null);
    const [sleepFlowChart, setScoreFlowChart] = useState(null);

    useEffect(() => {
        let dataArray;
        let timestampArray;
        let option;
        if (!sleepFlowChart) {
            // 此處極為重要，目的是避免DOM尚未被渲染就執行init，會出現頁面不顯示圖表，且控制台報錯的問題:
            // Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight.
            setTimeout(() => {
                setScoreFlowChart(echarts.init(sleepFlowDOM.current));
            }, 100);
        }
        if (sleepFlowChart && sleepFlowChartData) {
            timestampArray = sleepFlowChartData.data.map((item) => moment(item.timestamp).format('YYYY-MM-DD'));
            dataArray = sleepFlowChartData.data.map((item) => item.sleep);
            option = {
                title: {
                    text: "Sleep Flow",
                    show: false,
                    left: "center",
                    right: "center",
                    // color: theme.colorScheme === "light" ? "#333332" : theme.colors.brand[1]
                    color: "white"
                },
                xAxis: {
                    type: 'category',
                    data: timestampArray,
                    axisLine: {
                        show: false,
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
                        return `<div style="width: 150px; border-radius: 5px">
                            <div style="display: flex; justify-content: space-between">
                                <div>Date</div>
                                <div>${params[0].axisValue}</div></div>
                            <div style="display: flex; justify-content: space-between">
                                <div>${params[0].data ? "Sleep time" : " "}</div>
                                <div>${params[0].data ? params[0].data > 1 ? params[0].data + " hrs" : params[0].data + " hr" : "No record"}</div>
                            </div>
                        </div>`;
                    },
                },
                grid: {
                    top: "20px",
                    left: "8px",
                    right: "2px",
                    bottom: "15px",
                    containLabel: true
                },
                series: [
                    {
                        data: dataArray,
                        type: 'line',
                        smooth: true,
                        symbol: "circle",
                        symbolSize: 5,
                        lineStyle: {
                            color: '#ccc'
                        },
                        itemStyle: {
                            color: "#4e4a4a"
                        },
                        emphasis: {
                            scale: 2
                        }
                    }
                ]
            };
            sleepFlowChart.setOption(option);
        }
        const handleResize = () => sleepFlowChart?.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [sleepFlowChart, sleepFlowChartData]);

    return (
        <div ref={sleepFlowDOM} style={{ height: height + "px" }}></div>
    );
};

export default SleepFlowChart;