import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { useMantineTheme, } from "@mantine/core";

const ScoreDayBarChart = ({ height, scoreDayBarChartData }) => {
    const theme = useMantineTheme();
    const scoreDayDOM = useRef(null);
    const [scoreDayBarChart, setScoreDayBarChart] = useState(null);

    useEffect(() => {
        let option;
        let dataArray;

        if (!scoreDayBarChart) {
            // 此處極為重要，目的是避免DOM尚未被渲染就執行init，會出現頁面不顯示圖表，且控制台報錯的問題:
            // Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight.
            // setTimeout(() => {
            setScoreDayBarChart(echarts.init(scoreDayDOM.current));
            // }, 100);
        }

        if (scoreDayBarChart && scoreDayBarChartData?.data) {
            dataArray = JSON.parse(JSON.stringify(scoreDayBarChartData.data.barData));


            // 控制末端原角
            for (let i = 0; i <= 6; i++) {
                for (let j = dataArray.length - 1; j >= 0; j--) {
                    if (dataArray[j][i]) {
                        dataArray[j][i] = {
                            value: dataArray[j][i],
                            itemStyle: {
                                borderRadius: [0, 10, 10, 0]
                            }
                        };
                        break;
                    }
                }
            };

            const unitBarOption = {
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    formatter: (params) => {
                        if (!params.value) return "";
                        return params.value;
                        // return params.value + (params.value > 1 ? "days" : "day");
                    }
                },
                barWidth: "50%",
                emphasis: {
                    focus: 'self'
                },
                roundCap: true
            };
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    },
                    confine: false
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '1%',
                    top: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ['Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday']
                },
                legend: {
                    show: false
                },
                color: theme.colors.emotion,
                series: [
                    {
                        ...unitBarOption,
                        name: 'Depressed',
                        data: dataArray[0]
                    },
                    {
                        ...unitBarOption,
                        name: 'Sad',
                        data: dataArray[1]
                    },
                    {
                        ...unitBarOption,
                        name: 'Peace',
                        data: dataArray[2]
                    },
                    {
                        ...unitBarOption,
                        name: 'Smile',
                        data: dataArray[3]
                    },
                    {
                        ...unitBarOption,
                        name: 'Happy',
                        data: dataArray[4]
                    },
                    {
                        ...unitBarOption,
                        name: 'No record',
                        data: dataArray[5]
                    },
                ]
            };
            scoreDayBarChart.setOption(option);
        }

        const handleResize = () => scoreDayBarChart?.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [scoreDayBarChart, scoreDayBarChartData, theme]);

    return (
        <div ref={scoreDayDOM} style={{ height: height + "px" }}></div>
    );
};

export default ScoreDayBarChart;