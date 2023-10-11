import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { useMantineTheme, } from "@mantine/core";

const ScoreDayChart = () => {
    const theme = useMantineTheme();
    const scoreDayDOM = useRef(null);
    const [scoreDayChart, setScoreDayChart] = useState(null);
    const handleResize = () => scoreDayChart?.resize();
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: "3%",
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [
            {
                name: 'Direct',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: 'Mail Ad',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Affiliate Ad',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ad',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
                name: 'Search Engine',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    useEffect(() => {
        if (!scoreDayChart) {
            // 此處極為重要，目的是避免DOM尚未被渲染就執行init，會出現頁面不顯示圖表，且控制台報錯的問題:
            // Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight.
            setTimeout(() => {
                setScoreDayChart(echarts.init(scoreDayDOM.current));
            }, 100);
        }
        scoreDayChart?.setOption(option);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [option, handleResize]);

    return (
        <div ref={scoreDayDOM} style={{ height: "300px" }}></div>
    );
};

export default ScoreDayChart;