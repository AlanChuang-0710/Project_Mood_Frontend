import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import moment from "moment";
import { useMantineTheme, } from "@mantine/core";

const EventFlowChart = ({ height, eventFlowChartData }) => {
    const theme = useMantineTheme();
    const eventFlowDOM = useRef(null);
    const [eventFlowChart, setEventFlowChart] = useState(null);


    useEffect(() => {
        if (!eventFlowChart) {
            setEventFlowChart(echarts.init(eventFlowDOM.current));
        }
        if (eventFlowChart && eventFlowChartData) {
            let option = {
                title: {
                    text: "Mood Flow",
                    show: false,
                    left: "center",
                    right: "center",
                    color: "white"
                },
                xAxis: {
                    type: 'category',
                    data: eventFlowChartData.xAxis,
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
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderWidth: 0,
                    formatter: (params) => {
                        console.log(params);
                        return `<div style="width: 150px; padding: 5px 6px; border-radius: 5px; border:3px solid ${params[0].data.color}; background: #FFF">
                            <div style="display: flex; justify-content: space-between">
                                <div>Date</div>
                                <div>${params[0].axisValue}</div>
                            </div>
                            <div style="display: flex; justify-content: space-between">
                                <div>Count</div>
                                <div>${params[0].value}</div>
                            </div>
                        </div>`;
                    },
                },
                grid: {
                    top: "10px",
                    left: "8px",
                    right: "2px",
                    bottom: "15px",
                    containLabel: true
                },
                series: [
                    {
                        data: eventFlowChartData.yAxis,
                        type: 'line',
                        smooth: true,
                        // 控制value為null時，是否斷開連線
                        // connectNulls: false,
                        // 折線線條
                        lineStyle: {
                            color: '#ccc',
                        },
                        // 改為實心點點
                        symbol: "circle",
                        symbolSize: 5,
                        // 折線數據點
                        itemStyle: {
                            borderWidth: 0,
                        },
                        emphasis: {
                            scale: 2
                        }
                    }
                ]
            };
            eventFlowChart.setOption(option);
        };
        const handleResize = () => eventFlowChart?.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [eventFlowChart, eventFlowChartData, theme]);

    return (
        <div ref={eventFlowDOM} style={{ height: height + "px" }}></div>
    );
};

export default EventFlowChart;