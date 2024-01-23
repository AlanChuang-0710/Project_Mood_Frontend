import React, { useEffect, useRef, useState } from 'react';
import { useMantineTheme, } from "@mantine/core";
import * as echarts from "echarts";
import ecStat from 'echarts-stat';
import moment from 'moment';
echarts.registerTransform(ecStat.transform.regression);


const SleepScoreScatterChart = ({ sleepFlowChartData, scoreFlowChartData, height }) => {
    const scatterChartDOM = useRef(null);
    const [scatterChart, setScatterChart] = useState(null);
    const theme = useMantineTheme();

    useEffect(() => {
        if (!scatterChart) {
            setScatterChart(echarts.init(scatterChartDOM.current));
        }
        if (sleepFlowChartData && scoreFlowChartData) {
            if (!(sleepFlowChartData.data.length === scoreFlowChartData.data.length)) return;
            let sleepData = sleepFlowChartData.data.slice(1); // 當日情緒造成的睡眠品質是隔日才會被記錄，故要做此處理
            let scoreData = scoreFlowChartData.data.slice(0, -1);
            const nameMap = ["Depressed", "Sad", "Peace", "Smile", "Happy"];
            let data = [];
            sleepData.forEach((item, index) => {
                data.push([item.sleep, scoreData[index].score, moment(item.timestamp).format('YYYY-MM-DD')]);
            });
            scatterChart.setOption({
                dataset: [
                    {
                        source: data
                    },
                    {
                        transform: {
                            type: 'ecStat:regression'
                            // 'linear' by default.
                            // config: { method: 'linear', formulaOn: 'end'}
                        }
                    }
                ],
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
                        return value.min - 1;
                    },
                    max: function (value) {
                        return value.max + 1;
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            opacity: 0.2
                        }
                    },
                    axisLabel: {
                        formatter(value) {
                            return (value > 2 || value < -2) ? "" : value;
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
                        name: 'scatter',
                        symbolSize: 10,
                        type: 'scatter',
                        tooltip: {
                            formatter({ data }) {
                                return `
                                <div style="width: 150px; padding: 5px 6px; border-radius: 5px; border: none ; background: #FFF">
                                    <div style="display: flex; justify-content: space-between">
                                        <div>Date</div>
                                        <div>${data[2]}</div>
                                    </div>
                                    <div style="display: flex; justify-content: space-between">
                                    <div>Mood:</div>
                                    <div>${nameMap[data[1] + 2]}</div>
                                    </div>
                                    <div style="display: flex; justify-content: space-between">
                                        <div>Sleeping hour:</div>
                                        <div>${data[0]}</div>
                                    </div>
                                </div>
                                `;
                            }
                        }
                    },
                    {
                        name: 'line',
                        type: 'line',
                        datasetIndex: 1,
                        symbolSize: 0.1,
                        symbol: 'circle',
                        label: { show: true, fontSize: 16 },
                        labelLayout: { dx: -20 },
                        encode: { label: 2, tooltip: 1 },
                        tooltip: {
                            show: false
                        },
                        lineStyle: {
                            color: "#92db7f",
                            opacity: theme.colorScheme === 'light' ? 1 : 0.4
                        }
                    }
                ]
            });
        }
        const handleResize = () => scatterChart?.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [scatterChart, sleepFlowChartData, scoreFlowChartData]);

    return (
        // <div ref={scatterChartDOM} style={{ height: `${height} px` }}></div>
        <div ref={scatterChartDOM} style={{ height: height + "px" }}></div>
    );
};

export default SleepScoreScatterChart;