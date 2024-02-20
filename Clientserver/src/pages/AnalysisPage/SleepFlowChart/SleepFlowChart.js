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
            setScoreFlowChart(echarts.init(sleepFlowDOM.current));
        }
        if (sleepFlowChart && sleepFlowChartData?.data) {
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
                    type: 'value',
                    name: "sleeping hour per day",
                    nameLocation: "middle",
                    nameGap: 22,
                    nameTextStyle: {
                        color: "#aaa",
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ["#4e4a4a"],
                            width: 1,
                            type: 'solid',
                            opacity: 1
                        }
                    },
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
                    left: "20px",
                    right: "8px",
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
                            color: theme.colorScheme === 'light' ? "#c5c9c6" : "#fff"
                        },
                        emphasis: {
                            scale: theme.colorScheme === 'light' ? 1.2 : 2
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
    }, [sleepFlowChart, sleepFlowChartData, theme]);

    return (
        <div ref={sleepFlowDOM} style={{ height: height + "px" }}></div>
    );
};

export default SleepFlowChart;