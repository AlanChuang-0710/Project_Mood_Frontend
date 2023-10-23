import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { useMantineTheme, } from "@mantine/core";
// import classes from "./WorldCloudChart.module.scss";

const WorldCloudChart = ({ height }) => {
    const theme = useMantineTheme();

    const wordCloudDOM = useRef(null);
    const [wordCloudChart, setWordCloudChart] = useState(null);

    useEffect(() => {
        const maskImage = new Image();
        //重点：遮罩圖片的base64码
        maskImage.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjE4MywyOTcuMDY1Yy0xNS45ODUtMTkuODkzLTM2LjI2NS0zMi42OTEtNjAuODE1LTM4LjM5OWM3LjgxLTExLjk5MywxMS43MDQtMjUuMTI2LDExLjcwNC0zOS4zOTkgICBjMC0yMC4xNzctNy4xMzktMzcuNDAxLTIxLjQwOS01MS42NzhjLTE0LjI3My0xNC4yNzItMzEuNDk4LTIxLjQxMS01MS42NzUtMjEuNDExYy0xOC4yNzEsMC0zNC4wNzEsNS45MDEtNDcuMzksMTcuNzAzICAgYy0xMS4yMjUtMjcuMDI4LTI5LjA3NS00OC45MTctNTMuNTI5LTY1LjY2N2MtMjQuNDYtMTYuNzQ2LTUxLjcyOC0yNS4xMjUtODEuODAyLTI1LjEyNWMtNDAuMzQ5LDAtNzQuODAyLDE0LjI3OS0xMDMuMzUzLDQyLjgzICAgYy0yOC41NTMsMjguNTQ0LTQyLjgyNSw2Mi45OTktNDIuODI1LDEwMy4zNTFjMCwyLjg1NiwwLjE5MSw2Ljk0NSwwLjU3MSwxMi4yNzVjLTIyLjA3OCwxMC4yNzktMzkuODc2LDI1LjgzOC01My4zODksNDYuNjg2ICAgQzYuNzU5LDI5OS4wNjcsMCwzMjIuMDU1LDAsMzQ3LjE4YzAsMzUuMjExLDEyLjUxNyw2NS4zMzMsMzcuNTQ0LDkwLjM1OWMyNS4wMjgsMjUuMDMzLDU1LjE1LDM3LjU0OCw5MC4zNjIsMzcuNTQ4aDMxMC42MzYgICBjMzAuMjU5LDAsNTYuMDk2LTEwLjcxNSw3Ny41MTItMzIuMTIxYzIxLjQxMy0yMS40MTIsMzIuMTIxLTQ3LjI0OSwzMi4xMjEtNzcuNTE1ICAgQzU0OC4xNzIsMzM5Ljc1Nyw1NDAuMTc0LDMxNi45NTIsNTI0LjE4MywyOTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';
        const getColor = () => {
            const colorArr = theme.colors.brand;
            const index = Math.floor(Math.random() * 10) % 3;
            return colorArr[index];
        };
        const data = [
            {
                name: 'Sam S Club',
                value: 10000,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Macys',
                value: 6181,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Amy Schumer',
                value: 4386,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Johnny Depp',
                value: 847,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Lena Dunham',
                value: 582,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Lewis Hamilton',
                value: 555,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'KXAN',
                value: 550,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Johnny Depp',
                value: 847,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Lena Dunham',
                value: 582,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Lewis Hamilton',
                value: 555,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'KXAN',
                value: 550,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Sam S Club',
                value: 10000,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Macys',
                value: 6181,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Amy Schumer',
                value: 4386,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Johnny Depp',
                value: 847,
                textStyle: {
                    color: getColor()
                }
            }, {
                name: 'Lena Dunham',
                value: 582,
                textStyle: {
                    color: getColor()
                }
            },];
        const handleResize = () => wordCloudChart?.resize();
        const option = {
            backgroundColor: theme.colorScheme === 'light' ? theme.colors.light[0] : "transparent",
            // backgroundColor: theme.colorScheme === 'light' ? theme.colors.light[0] : theme.colors.night[0],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            series: [{
                type: 'wordCloud',
                gridSize: 1,
                // Text size range which the value in data will be mapped to.
                // Default to have minimum 12px and maximum 60px size.
                sizeRange: [12, 55],
                // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
                shape: 'circle',
                rotationRange: [-45, 0, 45, 90],
                maskImage: maskImage,
                textStyle: {
                    normal: {
                        color: function () {
                            return 'rgb(' +
                                Math.round(Math.random() * 255) +
                                ', ' + Math.round(Math.random() * 255) +
                                ', ' + Math.round(Math.random() * 255) + ')';
                        }
                    }
                },
                // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                // Default to be put in the center and has 75% x 80% size.
                left: 'center',
                top: 'center',
                right: null,
                bottom: null,
                width: '90%',
                height: '110%',
                data
            }]
        };
        if (!wordCloudChart) {
            // 此處極為重要，目的是避免DOM尚未被渲染就執行init，會出現頁面不顯示圖表，且控制台報錯的問題:
            // Can't get DOM width or height. Please check dom.clientWidth and dom.clientHeight.
            setTimeout(() => {
                setWordCloudChart(echarts.init(wordCloudDOM.current));
            }, 100);
        }
        wordCloudChart?.setOption(option);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [theme, wordCloudChart]);

    return (
        <div style={{ borderRadius: "10px", overflow: "hidden" }}>
            <div ref={wordCloudDOM} style={{ height: height + "px" }}></div>
        </div>
    );
};

export default WorldCloudChart;