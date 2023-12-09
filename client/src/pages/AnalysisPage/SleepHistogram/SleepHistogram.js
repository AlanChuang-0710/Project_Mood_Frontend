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
        if (sleepFlowChartData) {
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
                    axisLine: {
                        onZeroAxisIndex: -3
                    },
                    axisTick: {
                        show: false
                    },
                    min: function (value) {
                        return value.min - 2;
                    },
                    max: function (value) {
                        return value.max + 2;
                    },
                    splitLine: {
                        lineStyle: {
                            opacity: 0.2
                        }
                    },
                },
                yAxis: {
                    min: function (value) {
                        return value.min;
                    },
                    max: function (value) {
                        return value.max + (value.max % 2 ? 1 : 2);
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            opacity: 0.2
                        }
                    },
                },
                grid: {
                    top: "20px",
                    left: "12px",
                    right: "10px",
                    bottom: "15px",
                    containLabel: true
                },
                tooltip: {
                    show: true
                },
                series: [
                    {
                        name: 'SH Histogram',
                        type: 'bar',
                        barWidth: '100%',
                        data: dataTransform(sleepArr),
                        itemStyle: {
                            borderRadius: [15, 15, 0, 0]
                        }
                    }
                ]
            };
            sleepHistogram.setOption(option);
        }

    }, [sleepFlowChartData, sleepHistogram]);

    return (
        <div ref={SHDOM} style={{ height: height + "px" }}></div>
    );
};

export default SleepHistogram;