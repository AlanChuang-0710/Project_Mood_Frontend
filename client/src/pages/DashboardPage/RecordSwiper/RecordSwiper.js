import React, { useEffect, useState, useMemo } from 'react';
import { Grid, useMantineTheme, } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';
import SVG from "react-inlinesvg";
import moment from 'moment';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from "../../../store/reducer/authSlice";
import { useDeleteFeelingMutation } from '../../../store/api/feelingApi';
import { happy, smile, normal, sad, depressed, deleteIcon, editIcon, uploadIcon } from "../../../assets/index";
import classes from "./RecordSwiper.module.scss";

SwiperCore.use([Scrollbar, Mousewheel]);

const RecordSwiper = ({ openDailyRecord, monthlyRecord, setSelectedDateValue }) => {
    // 獲得視口寬度
    const { width } = useViewportSize();
    const theme = useMantineTheme();

    const userId = useSelector(selectCurrentUserId);

    const [deleteFeeling, { isLoading, isSuccess }] = useDeleteFeelingMutation();

    const monthData = useMemo(() => {
        if (monthlyRecord?.data) {
            const getIcon = (score) => {
                let icon, backgroundColor;
                switch (score) {
                    case -2:
                        icon = depressed;
                        backgroundColor = theme.colors.emotion[4];
                        break;
                    case -1:
                        icon = sad;
                        backgroundColor = theme.colors.emotion[3];
                        break;
                    case 1:
                        icon = smile;
                        backgroundColor = theme.colors.emotion[1];
                        break;
                    case 2:
                        icon = happy;
                        backgroundColor = theme.colors.emotion[0];
                        break;
                    default:
                        icon = normal;
                        backgroundColor = theme.colors.emotion[2];
                        break;
                }
                return { icon, backgroundColor };
            };
            return monthlyRecord.data.map((dayRecord) => {
                const time = moment(dayRecord.timestamp);
                const month = time.format('MMM.');
                const date = time.format('DD');
                const { icon, backgroundColor } = getIcon(dayRecord.score);
                return { ...dayRecord, month, date, icon, backgroundColor, userId };
            });
        } else {
            return [];
        }
    }, [monthlyRecord]);

    const toolList = [
        { icon: uploadIcon, fn: () => { console.log("upload"); } },
        {
            icon: deleteIcon, fn: (({ userId: id, _id: feelingId }) => {
                deleteFeeling({ id, feelingId });
            })
        },
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
                {monthData.length > 0 ? monthData.map((item) => < SwiperSlide key={item._id} tag="div" className={classes["swiper-slide-day"]}>
                    <div className={classes["day-tool-list"]}>
                        {toolList.map((tool, index) => <div className={classes["day-tool"]} key={index} onClick={() => tool.fn(item)}>
                            <SVG src={tool.icon} width={"100%"} height={"100%"}></SVG>
                        </div>)}
                    </div>
                    <div className={classes["day-wrapper"]} >
                        <Grid>
                            <Grid.Col span="content">
                                <div className={classes["container"]}>
                                    <div className={classes["badge"]} style={{ backgroundColor: theme.colorScheme === "light" ? item.backgroundColor : "" }} ></div>
                                    <div className={classes["month-date"]} >
                                        <div className={classes["month"]}>{item.month}</div>
                                        <div className={classes["date"]}>{item.date}</div>
                                    </div>
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
                </SwiperSlide>) : <SwiperSlide tag="div" className={`${classes["swiper-slide-day"]} ${classes["no-month-data"]}`}>There is no any record in this month yet.</SwiperSlide>
                }
            </Swiper >
        </>
    );
};

export default RecordSwiper;