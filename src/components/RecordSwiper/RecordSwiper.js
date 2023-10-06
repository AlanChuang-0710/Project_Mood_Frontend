import React from 'react';
import { Grid, useMantineTheme } from "@mantine/core";
import classes from "./RecordSwiper.module.scss";
// import swiperBackground from "../../assets/swiper_background.svg";
import faceHappy from "../../assets/emotion_set/happy.svg";
import uploadIcon from "../../assets/tool/upload.svg";
import deleteIcon from "../../assets/tool/delete.svg";
import editIcon from "../../assets/tool/edit.svg";
import SVG from "react-inlinesvg";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';


SwiperCore.use([Scrollbar, Mousewheel]);

const RecordSwiper = () => {
    const theme = useMantineTheme();

    const fakeData = [
        {
            id: "4691",
            month: "Oct.",
            date: 18,
            mood: faceHappy,
            tagList: ["愉快", "放鬆"],
            memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident ex, commodi assumenda ab dolorem, necessitatibus natus accusantium totam velit voluptates, doloribus aut. Maiores sint dolores illo nisi recusandae ipsa animi, voluptate minima explicabo ad non iusto magnam, laborum ea perferendis at delectus esse harum ullam distinctio molestias? Optio, consequatur."
        },
        {
            id: "3259",
            month: "Nov.",
            date: 20,
            mood: faceHappy,
            tagList: ["生氣", "憤怒"],
            memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident ex, commodi assumenda ab dolorem, necessitatibus natus accusantium totam velit voluptates, doloribus aut. Maiores sint dolores illo nisi recusandae ipsa animi, voluptate minima explicabo ad non iusto magnam, laborum ea perferendis at delectus esse harum ullam distinctio molestias? Optio, consequatur."
        },
        {
            id: "329",
            month: "Nov.",
            date: 20,
            mood: faceHappy,
            tagList: ["生氣", "憤怒"],
            memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident ex, commodi assumenda ab dolorem, necessitatibus natus accusantium totam velit voluptates, doloribus aut. Maiores sint dolores illo nisi recusandae ipsa animi, voluptate minima explicabo ad non iusto magnam, laborum ea perferendis at delectus esse harum ullam distinctio molestias? Optio, consequatur."
        },
        {
            id: "59",
            month: "Nov.",
            date: 20,
            mood: faceHappy,
            tagList: ["生氣", "憤怒"],
            memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident ex, commodi assumenda ab dolorem, necessitatibus natus accusantium totam velit voluptates, doloribus aut. Maiores sint dolores illo nisi recusandae ipsa animi, voluptate minima explicabo ad non iusto magnam, laborum ea perferendis at delectus esse harum ullam distinctio molestias? Optio, consequatur."
        },
        {
            id: "32",
            month: "Nov.",
            date: 20,
            mood: faceHappy,
            tagList: ["生氣", "憤怒"],
            memo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti provident ex, commodi assumenda ab dolorem, necessitatibus natus accusantium totam velit voluptates, doloribus aut. Maiores sint dolores illo nisi recusandae ipsa animi, voluptate minima explicabo ad non iusto magnam, laborum ea perferendis at delectus esse harum ullam distinctio molestias? Optio, consequatur."
        }
    ];

    const toolList = [uploadIcon, deleteIcon, editIcon];

    return (
        <Swiper spaceBetween={10}
            slidesPerView={3}
            direction="vertical"
            mousewheel={true}
            scrollbar={{ draggable: true }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            className={classes["swiper-day"]}
        >
            {fakeData.map((item) => < SwiperSlide key={item.id} tag="div" className={classes["swiper-slide-day"]}>
                <div className={classes["day-tool-list"]}>
                    {toolList.map((tool, index) => <div className={classes["day-tool"]} key={index}>
                        <SVG src={tool} width={"100%"} height={"100%"}></SVG>
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
                                <SVG src={item.mood} width={"100%"} height={"100%"}></SVG>
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
    );
};

export default RecordSwiper;