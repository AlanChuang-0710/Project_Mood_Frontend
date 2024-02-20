import React, { useState, useRef, useEffect } from 'react';
import { useMantineTheme } from "@mantine/core";
import * as echarts from "echarts";

const SleepHistogram = ({ height, sleepFlowChartData }) => {
    const theme = useMantineTheme();
    const SHDOM = useRef(null);
    let [sleepHistogram, setSleepHistogram] = useState(null);

    useEffect(() => {
        if (!sleepHistogram) {
            setSleepHistogram(echarts.init(SHDOM.current));
        }
        if (sleepFlowChartData?.data) {
            function dataTransform(arr) {
                let result = {};
                arr.forEach((data) => {
                    if (!data) return;
                    let _data = Math.floor(data);
                    if (_data % 2) {
                        result[_data] = result[_data] ? result[_data] + 1 : 1;
                    } else {
                        if (data - _data) {
                            result[_data + 1] = result[_data + 1] ? result[_data + 1] + 1 : 1;
                        } else {
                            result[_data - 1] = result[_data - 1] ? result[_data - 1] + 1 : 1;
                        }
                    }
                });
                return Object.entries(result);
            };
            let sleepArr = sleepFlowChartData.data.map((item) => item.sleep);
            let option = {
                xAxis: {
                    name: "sleeping hours per day",
                    nameLocation: "middle",
                    nameGap: 25,
                    nameTextStyle: {
                        color: "#aaa",
                    },
                    axisLine: {
                        onZeroAxisIndex: -3
                    },
                    axisTick: {
                        show: false
                    },
                    min: function (value) {
                        return 0;
                    },
                    max: function (value) {
                        return 24;
                    },
                    interval: 2,
                    splitLine: {
                        lineStyle: {
                            opacity: 0.2
                        }
                    },
                },
                yAxis: {
                    name: "counts",
                    nameLocation: "middle",
                    nameGap: 21,
                    nameTextStyle: {
                        color: "#aaa",
                    },
                    min: function (value) {
                        return 0;
                    },
                    max: function (value) {
                        return value.max + (value.max % 2 ? 1 : 2);
                    },
                    axisTick: {
                        show: false
                    },
                    interval: 1,
                    splitLine: {
                        lineStyle: {
                            opacity: 0.2
                        }
                    },
                },
                grid: {
                    top: "20px",
                    left: "16px",
                    right: "10px",
                    bottom: "20px",
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    formatter: (params) => {
                        return `<div style="width: 160px; border-radius: 5px">
                            <div style="display: flex; justify-content: space-between">
                                <div>Sleeping Hours: </div>
                                <div>${params.data[0] - 1}~${params.data[0] / 1 + 1}</div>
                            </div>
                            <div style="display: flex; justify-content: space-between">
                                <div>Count: </div>
                                <div>${params.data[1]}</div>
                            </div>
                        </div>`;
                    },
                },
                series: [
                    {
                        name: 'SH Histogram',
                        type: 'bar',
                        barWidth: '10px',
                        data: dataTransform(sleepArr),
                        itemStyle: {
                            borderRadius: [15, 15, 0, 0]
                        }
                    }
                ]
            };
            sleepHistogram.setOption(option);
        }
        const handleResize = () => sleepHistogram?.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [sleepFlowChartData, sleepHistogram]);

    return (
        <div ref={SHDOM} style={{ height: height + "px" }}></div>
    );
};

export default SleepHistogram;