import React, { useCallback } from 'react';
import classes from "./CarouselSwiper.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Mousewheel, Autoplay } from 'swiper';
import slide1 from "../../../../assets/compass/carousel_slide1.png";
import slide2 from "../../../../assets/compass/carousel_slide2.jpg";
import 'swiper/css';
import 'swiper/css/scrollbar';
SwiperCore.use([Scrollbar, Mousewheel, Autoplay]);

const CarouselSwiper = ({ height }) => {
    const fakeData = [
        {
            id: 1,
            url: "https://www.google.com/",
            photo: slide1,
        },
        {
            id: 2,
            url: "https://www.google.com/",
            photo: slide2,
        },
        {
            id: 3,
            url: "https://www.google.com/",
            photo: slide1,
        },
        {
            id: 4,
            url: "https://www.google.com/",
            photo: slide2,
        }
    ];

    const posterClickHandler = useCallback((url) => {
        window.open(url);
    });

    return (
        <div>
            <div className={classes.title}>Priority Broadcast</div>
            <div className={classes["swiper-container"]}>
                <Swiper spaceBetween={5}
                    slidesPerView={1}
                    direction={"horizontal"}
                    scrollbar={{ draggable: true }}
                    className={classes["activity-swiper"]}
                    style={{ height: `${height}px` }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop
                >

                    {[...fakeData].map((poster) =>
                        < SwiperSlide tag="div" className={classes["activity-slide"]} key={poster.id} onClick={() => posterClickHandler(poster.url)}>
                            <img src={poster.photo} alt="優先推廣海報" />
                        </SwiperSlide>)}
                </Swiper>
            </div>
        </div>
    );
};

export default CarouselSwiper;