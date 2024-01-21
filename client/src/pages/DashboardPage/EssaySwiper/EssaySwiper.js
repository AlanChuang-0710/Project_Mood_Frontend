import React, { useCallback, useEffect, useState } from 'react';
import { Chip, Group, Grid, Image } from "@mantine/core";
// import { useViewportSize } from '@mantine/hooks';
import SwiperCore, { Scrollbar, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import classes from "./Essay.module.scss";
import TrackerClick from '@/components/BuryPoint/BuryPoint';

SwiperCore.use([Scrollbar, Mousewheel]);

const EssaySwiper = ({ commonData }) => {
  // const theme = useMantineTheme();
  const [value, setValue] = useState('all');
  const [essayData, setEssayData] = useState(commonData);

  // 獲得視口寬度
  // const { height, width } = useViewportSize();
  // const [direction, setDirection] = useState("vertical");


  const essayClickHandler = useCallback((url) => {
    window.open(url);
  }, []);

  // useEffect(() => {
  // if (width < 700) {
  //   setDirection("horizontal");
  // } else {
  //   setDirection("vertical");
  // }
  // }, [width]);


  useEffect(() => {
    if (commonData) {
      let newArr = commonData.filter((item) => item.tags.includes(value));
      setEssayData(newArr);
    }
  }, [value, commonData]);

  return (
    <div>
      <Chip.Group multiple value={value} onChange={setValue} >
        <Group position="left" mb="xs">
          <Chip variant="light" value="all">All</Chip>
          <Chip variant="light" value="happiness">Happiness</Chip>
          <Chip variant="light" value="depression">Depression</Chip>
          <Chip variant="light" value="saddness">Saddness</Chip>
        </Group>
      </Chip.Group>

      <Swiper spaceBetween={5}
        slidesPerView={4}
        direction={"vertical"}
        mousewheel={true}
        scrollbar={{ draggable: true }}
        className={classes["essay-swiper"]}
      >

        {essayData && essayData.map((essay) =>
          < SwiperSlide tag="div" className={classes["essay-slide"]} key={essay._id} onClick={() => essayClickHandler(essay.url)}>
            <TrackerClick name="click" bpId={`essay:${essay._id}`}>
              <Grid>
                <Grid.Col span={4} >
                  <div>
                    <Image height={130} radius="md" fit='cover' src={essay.cover} alt="Random image" />
                  </div>
                </Grid.Col>
                <Grid.Col span={8} >
                  <div>
                    <div>
                      <div className={classes.title}>
                        {essay.title}
                      </div>
                      <div className={classes.author}>
                        by {essay.author}
                      </div>
                    </div>
                    <div className={classes.introduction}>
                      {essay.introduction}
                    </div>
                  </div>
                </Grid.Col>
              </Grid>
            </TrackerClick>
          </SwiperSlide>)}
      </Swiper>
    </div >
  );
};

export default EssaySwiper;