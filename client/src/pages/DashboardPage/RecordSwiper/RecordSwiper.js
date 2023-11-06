import React, { useEffect, useState, useMemo } from 'react';
import { Grid, useMantineTheme, } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import classes from "./RecordSwiper.module.scss";
import happy from "../../../assets/emotion_set/happy.svg";
import smile from "../../../assets/emotion_set/smile.svg";
import normal from "../../../assets/emotion_set/normal.svg";
import sad from "../../../assets/emotion_set/sad.svg";
import depressed from "../../../assets/emotion_set/depressed.svg";
import uploadIcon from "../../../assets/tool/upload.svg";
import deleteIcon from "../../../assets/tool/delete.svg";
import editIcon from "../../../assets/tool/edit.svg";
import SVG from "react-inlinesvg";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import moment from 'moment';


SwiperCore.use([Scrollbar, Mousewheel]);

const RecordSwiper = ({ openDailyRecord, monthlyRecord, setSelectedDateValue }) => {
    // 獲得視口寬度
    const { width } = useViewportSize();

    const theme = useMantineTheme();

    const monthData = useMemo(() => {
        if (monthlyRecord?.data) {
            const getIcon = (score) => {
                let icon;
                switch (score) {
                    case -2:
                        icon = depressed;
                        break;
                    case -1:
                        icon = sad;
                        break;
                    case 1:
                        icon = smile;
                        break;
                    case 2:
                        icon = happy;
                        break;
                    default:
                        icon = normal;
                        break;
                }
                return icon;
            };
            return monthlyRecord.data.map((dayRecord) => {
                const time = moment(dayRecord.timestamp);
                const month = time.format('MMM.');
                const date = time.format('DD');
                const icon = getIcon(dayRecord.score);
                return { ...dayRecord, month, date, icon };
            });
        } else {
            return [];
        }
    }, [monthlyRecord]);

    const toolList = [
        { icon: uploadIcon, fn: () => { console.log("update"); } },
        { icon: deleteIcon, fn: () => { console.log("delete"); } },
        {
            icon: editIcon, fn: ({ timestamp }) => {
                setSelectedDateValue(new Date(timestamp));
                openDailyRecord();
            }
        }
    ];

    const [slidesPerView, setSlidesPerView] = useState(3);
    const [swiperHeight, setSwiperHeight] = useState(404);

    useEffect(() => {
        if (width > 1198) {
            setSlidesPerView(4);
            setSwiperHeight(588);
        } else {
            setSlidesPerView(3);
            setSwiperHeight(404);
        }
    }, [width]);

    return (
        <>
            {/* <Chip.Group multiple value={value} onChange={setValue} >
                <Group position="left" mb="xs">
                    <Chip variant="light" value="All">All</Chip>
                    <Chip variant="light" value="Happiness">Happiness</Chip>
                    <Chip variant="light" value="Depression">Depression</Chip>
                    <Chip variant="light" value="Sad">Sad</Chip>
                </Group>
            </Chip.Group> */}

            {/* <div className={classes.title} style={{ color: theme.colorScheme === "light" ? "#4f5250" : theme.colors.tool[1] }}>October 2023</div> */}
            <Swiper spaceBetween={10}
                slidesPerView={slidesPerView}
                direction="vertical"
                mousewheel={true}
                scrollbar={{ draggable: true }}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                className={classes["swiper-day"]}
                style={{ height: `${swiperHeight}px` }}
            >
                {monthData.map((item) => < SwiperSlide key={item._id} tag="div" className={classes["swiper-slide-day"]}>
                    <div className={classes["day-tool-list"]}>
                        {toolList.map((tool, index) => <div className={classes["day-tool"]} key={index} onClick={() => tool.fn({ timestamp: item.timestamp })}>
                            <SVG src={tool.icon} width={"100%"} height={"100%"}></SVG>
                        </div>)}
                    </div>
                    <div className={classes["day-wrapper"]} style={{ backgroundColor: theme.colorScheme === "light" ? "rgba(213, 240, 206, .5)" : "" }}>
                        <Grid>
                            <Grid.Col span="content">
                                <div className={classes["month-date"]} >
                                    <div className={classes["month"]}>{item.month}</div>
                                    <div className={classes["date"]}>{item.date}</div>
                                </div>
                            </Grid.Col>
                            <Grid.Col span="content">
                                <div className={classes["mood"]}>
                                    <img src={item.icon} alt="Mood" />
                                </div>
                            </Grid.Col>
                            <Grid.Col span="auto">
                                <div >
                                    <div className={classes["tag-list"]}>
                                        {item.tags.length === 0 ? <div className={classes.tag}> Empty
                                        </div> : item.tags.map((item, index) => <div key={index} className={classes.tag}>
                                            {item}
                                        </div>)}
                                    </div>
                                    <div className={classes.memo}>
                                        {item.memo ? item.memo : "No memo recorded"}
                                    </div>
                                </div>
                            </Grid.Col>
                        </Grid>
                    </div >
                </SwiperSlide>)
                }
            </Swiper >
        </>
    );
};

export default RecordSwiper;