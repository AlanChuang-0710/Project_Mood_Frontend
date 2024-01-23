import React, { useCallback, useState } from 'react';
import { Chip, Group, Grid, Image } from "@mantine/core";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import classes from "./Activity.module.scss";
import test from "@/assets/test.jpg";
import test2 from "@/assets/test2.png";


SwiperCore.use([Scrollbar, Mousewheel]);

const ActivitySwiper = ({ height }) => {
  const [value, setValue] = useState('All');

  const fakeData = [
    {
      id: 1293,
      url: "https://www.google.com/",
      photo: test,
      title: "How to get away with Depression, top 10 sales!",
      author: "Alan Chuang",
      intro: "Meditation is a form of yoga and, like yoga, starts to shift you from identifying with your mind to identifying with your awareness"
    },
    {
      id: 1292,
      url: "https://www.google.com/",
      photo: test2,
      title: "Mountain therapy ",
      author: "Eric Bennett",
      intro: "A short stroll through the woods, a hike in the mountains, looking out at the ocean, or sitting  quietly in the desert can quickly begin to heal."
    },
    {
      id: 1290,
      url: "https://www.google.com/",
      photo: test,
      title: "SUP discovery course ",
      author: "Atoll Board Corp.",
      intro: "Stand up paddle boarding is an activity that completely alters your state of mind and physical body, where we could have great satisfaction"
    },
    {
      id: 13,
      url: "https://www.google.com/",
      photo: test,
      title: "How to get away with Depression, top 10 sales!",
      author: "Alan Chuang",
      intro: "Meditation is a form of yoga and, like yoga, starts to shift you from identifying with your mind to identifying with your awareness"
    },
    {
      id: 12,
      url: "https://www.google.com/",
      photo: test2,
      title: "Mountain therapy ",
      author: "Eric Bennett",
      intro: "A short stroll through the woods, a hike in the mountains, looking out at the ocean, or sitting  quietly in the desert can quickly begin to heal."
    },
    {
      id: 120,
      url: "https://www.google.com/",
      photo: test,
      title: "SUP discovery course ",
      author: "Atoll Board Corp.",
      intro: "Stand up paddle boarding is an activity that completely alters your state of mind and physical body, where we could have great satisfaction"
    }
  ];

  const essayClickHandler = useCallback((url) => {
    window.open(url);
  }, []);

  return (
    <div>
      <Chip.Group multiple value={value} onChange={setValue} >
        <Group position="left" mb="xs">
          <Chip variant="light" value="All">All</Chip>
          <Chip variant="light" value="Happiness">Happiness</Chip>
          <Chip variant="light" value="Depression">Depression</Chip>
          <Chip variant="light" value="Sad">Sad</Chip>
        </Group>
      </Chip.Group>

      <Swiper spaceBetween={5}
        slidesPerView={4}
        direction={"vertical"}
        mousewheel={true}
        scrollbar={{ draggable: true }}
        className={classes["activity-swiper"]}
        style={{ height: `${height}px` }}
      >

        {[...fakeData].map((essay) =>
          < SwiperSlide tag="div" className={classes["activity-slide"]} key={essay.id} onClick={() => essayClickHandler(essay.url)}>
            <Grid>
              <Grid.Col span={4} >
                <div>
                  <Image height={130} radius="md" fit='cover' src={essay.photo} alt="Random image" />
                </div>
              </Grid.Col>
              <Grid.Col span={8} >
                <div>
                  <div className={classes.title}>
                    {essay.title}
                  </div>
                  <div className={classes.author}>
                    by {essay.author}
                  </div>
                </div>
                <div className={classes.intro}>
                  {essay.intro}
                </div>
              </Grid.Col>
            </Grid>
          </SwiperSlide>)}
      </Swiper>
    </div >
  );
};

export default ActivitySwiper;