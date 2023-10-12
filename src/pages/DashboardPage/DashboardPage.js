import React, { useState, useCallback } from 'react';
import { Image, Grid, MediaQuery, Button, useMantineTheme, } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { DatePicker } from '@mantine/dates';
import classes from "./DashboardPage.module.scss";
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import userImage from "../../assets/dashboard/user.png";
import RecordSwiper from "./RecordSwiper/RecordSwiper";
import EssaySwiper from './EssaySwiper/EssaySwiper';
import DailyRecordModal from './DailyRecordModal/DailyRecordModal';

const DashboardPage = () => {
  const theme = useMantineTheme();

  /* date relative */
  const calendarStyle = {
    calendarHeaderLevel: {
      fontWeight: "700",
      color: theme.colorScheme === "light" ? "#4f5250" : theme.colors.tool[1],
      fontSize: "22px",
    },
    weekday: {
      fontWeight: "600",
      color: "#5e5e5e",
      fontSize: "16px",
      cursor: "default"
    },
    day: {
      margin: "5px 0 5px 0",
      fontSize: "16px",
      fontWeight: "500",
      color: `${theme.colors.tool[1]} !important`,
      padding: "0 0 3px 0",
      /* 修改當日的邊框 */
      '&[data-today]': {
        borderRadius: "15px",
        border: `2px solid ${theme.colors.tool[1]}}`
      },
      "&[data-selected]:hover": {
        backgroundColor: "red",
        color: "white"
      }
    },
  };
  const [selectedDateValue, setSelectedDateValue] = useState(new Date().setHours(0, 0, 0, 0));

  /* 心情 Modal */
  const [opened, { open, close }] = useDisclosure(false);
  const dateChangeHandler = useCallback((selectedDate) => {
    setSelectedDateValue(selectedDate);
    open();
  });

  return (
    <Grid>
      {/* Positive Phrase Section */}
      <Grid.Col xs={12} lg={8}>

        {/* milestone */}
        <div style={useGetComponentStyle()}>
          <Grid>
            <Grid.Col xs={6} md={8} >
              <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <div style={{ height: "100%" }}>
                  <div className={classes["phrase-wrapper"]}>
                    <div className={classes["phrase-title"]}>Congratulations John! 🎉</div>
                    <div className={classes["phrase-subtitle"]}> Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.</div>
                    <div style={{ marginTop: "20px" }} >
                      {/* <Button color="brand.0" styles={{ root: { "&:active": { background: theme.colors.brand[0] } } }} >View more...</Button> */}
                      <Button variant="light" radius="md" >View more...</Button>
                    </div>
                  </div>
                </div>
              </MediaQuery>
            </Grid.Col>
            <Grid.Col xs={12} md={4} style={{ display: "flex", justifyContent: "center", alignContent: "center" }} >
              <Image maw={350} fit="contain" radius="md" src={userImage} alt="Uesr" styles={{ root: { display: "flex", alignItems: "center" } }}
              />
            </Grid.Col>
          </Grid>
        </div>

        {/* tiny psycological test */}
        <div style={{ marginTop: "15px" }}>
          <Grid>
            <Grid.Col span={4}>
              <div style={useGetComponentStyle()}>
                1
              </div>
            </Grid.Col>
            <Grid.Col span={4}>
              <div style={useGetComponentStyle()}>
                1
              </div>
            </Grid.Col>
            <Grid.Col span={4} >
              <div style={useGetComponentStyle()}>
                1
              </div>
            </Grid.Col>
          </Grid >
        </div >
      </Grid.Col >

      {/* Date  */}
      < Grid.Col md={5} lg={4} >
        <div style={useGetComponentStyle()} >
          <div className={classes.calendar}>
            <DatePicker allowDeselect value={selectedDateValue} onChange={dateChangeHandler} hideOutsideDates styles={calendarStyle}
              size="md" locale="zh-tw"
            // monthLabelFormat="YYYY年 M月"
            />
          </div>
        </div>
      </Grid.Col>

      {/* Month record */}
      <Grid.Col md={7} lg={6}>
        <div className={classes["month-wrapper"]} style={useGetComponentStyle()} >
          <RecordSwiper openDailyRecord={open} />
        </div>
      </Grid.Col>

      {/* Essay recommend */}
      <Grid.Col xs={12} lg={6}>
        <div className={classes["essay-wrapper"]} style={useGetComponentStyle()} >
          <EssaySwiper />
        </div>
      </Grid.Col>

      {/* 新增心情 Modal */}
      <DailyRecordModal opened={opened} open={open} close={close} selectedDateValue={selectedDateValue} />
    </Grid >
  );
};

export default DashboardPage;;