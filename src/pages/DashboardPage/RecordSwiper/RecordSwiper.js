import React, { useEffect, useState } from 'react';
import { Grid, useMantineTheme, Group, Chip } from "@mantine/core";
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


SwiperCore.use([Scrollbar, Mousewheel]);

const RecordSwiper = ({ openDailyRecord }) => {
    // 獲得視口寬度
    const { height, width } = useViewportSize();
    // const [value, setValue] = useState('All');

    const theme = useMantineTheme();

    const fakeData = [
        {
            id: "4691",
            month: "Oct.",
            date: 18,
            mood: happy,
            tagList: ["愉快", "放鬆"],
            memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident ex, commodi assumenda ab dolorem, necessitatibus natus accusantium totam velit voluptates, doloribus aut. Maiores sint dolores illo nisi recusandae ipsa animi, voluptate minima explicabo ad non iusto magnam, laborum ea perferendis at delectus esse harum ullam distinctio molestias? Optio, consequatur."
        },
        {
            id: "3259",
            month: "Nov.",
            date: 20,
            mood: happy,
            tagList: ["生氣", "憤怒"],
            memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident ex, commodi assumenda ab dolorem, necessitatibus natus accusantium totam velit voluptates, doloribus aut. Maiores sint dolores illo nisi recusandae ipsa animi, voluptate minima explicabo ad non iusto magnam, laborum ea perferendis at delectus esse harum ullam distinctio molestias? Optio, consequatur."
        },
        {
            id: "329",
            month: "Nov.",
            date: 20,
            mood: happy,
            tagList: ["生氣", "憤怒"],
            memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident ex, commodi assumenda ab dolorem, necessitatibus natus accusantium totam velit voluptates, doloribus aut. Maiores sint dolores illo nisi recusandae ipsa animi, voluptate minima explicabo ad non iusto magnam, laborum ea perferendis at delectus esse harum ullam distinctio molestias? Optio, consequatur."
        },
        {
            id: "59",
            month: "Nov.",
            date: 20,
            mood: happy,
            tagList: ["生氣", "憤怒"],
            memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident ex, commodi assumenda ab dolorem, necessitatibus natus accusantium totam velit voluptates, doloribus aut. Maiores sint dolores illo nisi recusandae ipsa animi, voluptate minima explicabo ad non iusto magnam, laborum ea perferendis at delectus esse harum ullam distinctio molestias? Optio, consequatur."
        },
        {
            id: "32",
            month: "Nov.",
            date: 20,
            mood: happy,
            tagList: ["生氣", "憤怒"],
            memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident ex, commodi assumenda ab dolorem, necessitatibus natus accusantium totam velit voluptates, doloribus aut. Maiores sint dolores illo nisi recusandae ipsa animi, voluptate minima explicabo ad non iusto magnam, laborum ea perferendis at delectus esse harum ullam distinctio molestias? Optio, consequatur."
        }
    ];

    const toolList = [
        { icon: uploadIcon, fn: () => { console.log("update"); } },
        { icon: deleteIcon, fn: () => { console.log("delete"); } },
        { icon: editIcon, fn: () => { openDailyRecord(); } }
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
                {fakeData.map((item) => < SwiperSlide key={item.id} tag="div" className={classes["swiper-slide-day"]}>
                    <div className={classes["day-tool-list"]}>
                        {toolList.map((tool, index) => <div className={classes["day-tool"]} key={index} onClick={tool.fn}>
                            <SVG src={tool.icon} width={"100%"} height={"100%"}></SVG>
                        </div>)}
                    </div>
                    <div className={classes["day-wrapper"]} style={{ backgroundColor: theme.colorScheme === "light" ? "rgba(213, 240, 206, .5)" : "" }}>
                        <Grid>
                            <Grid.Col span="content">
                                {/* <div className={classes["month-date"]} style={{ background: `url(${swiperBackground}) no-repeat`, backgroundSize: "contain" }}> */}
                                <div className={classes["month-date"]} >
                                    <div className={classes["month"]}>{item.month}</div>
                                    <div className={classes["date"]}>{item.date}</div>
                                </div>
                            </Grid.Col>
                            <Grid.Col span="content">
                                <div className={classes["mood"]}>
                                    <img src={item.mood} alt="Mood" />
                                </div>
                            </Grid.Col>
                            <Grid.Col span="auto">
                                <div >
                                    <div className={classes["tag-list"]}>
                                        {item.tagList.map((item, index) => <div key={index} className={classes.tag}>
                                            {item}
                                        </div>)}
                                    </div>
                                    <div className={classes.memo}>
                                        {item.memo}
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