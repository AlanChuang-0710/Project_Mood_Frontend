import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const ScoreRatioPieChart = () => {
    const scoreRatioPieDOM = useRef(null);
    const [scoreRatioPieChart, setScoreRaioPieChart] = useState(null);
    const handleResize = () => scoreRatioPieChart?.resize();
    const option = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ]
    };

    useEffect(() => {
        if (!scoreRatioPieChart) {
            // 此處極為重要，目的是避免DOM尚未被渲染就執行init，會出現頁面不顯示圖表，且控制台報錯的問題:
            // Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight.
            setTimeout(() => {
                setScoreRaioPieChart(echarts.init(scoreRatioPieDOM.current));
            }, 100);
        }
        scoreRatioPieChart?.setOption(option);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [option]);

    return (
        <div ref={scoreRatioPieDOM} style={{ height: "200px", widt: "200px" }}></div>
    );
};

export default ScoreRatioPieChart;