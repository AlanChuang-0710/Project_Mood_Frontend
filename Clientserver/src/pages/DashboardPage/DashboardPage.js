import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Image, Grid, MediaQuery, Button, useMantineTheme, } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { DatePicker } from '@mantine/dates';
import RecordSwiper from "./RecordSwiper/RecordSwiper";
import EssaySwiper from './EssaySwiper/EssaySwiper';
import DailyRecordModal from './DailyRecordModal/DailyRecordModal';
import { useGetUserFeelingQuery } from "@/store/api/feelingApi";
import { useGetCommonEssayDataQuery } from "@/store/api/commonApi";
import { selectCurrentUserId } from "@/store/reducer/authSlice";
import { useGetComponentStyle } from "@/styles/dayNightStyle";
import { userImage } from "@/assets/index";
import { useFetch } from '@/api/useFetch';
import classes from "./DashboardPage.module.scss";
import Tracker from '@/components/BuryPoint/BuryPoint';


const DashboardPage = () => {
  let startTime = new Date();
  startTime.setDate(1);
  startTime.setHours(0, 0, 0, 0);
  startTime = startTime.getTime();
  let endTime = new Date();
  endTime.setMonth(new Date().getMonth() + 1);
  endTime.setDate(0); // setDate(0) 會將日期設為上個月的最後一天
  endTime.setHours(0, 0, 0, 0);
  endTime = endTime.getTime();

  const { data: monthlyRecord } = useGetUserFeelingQuery({ id: useSelector(selectCurrentUserId), startTime, endTime });
  const { data: commonData } = useGetCommonEssayDataQuery({ id: useSelector(selectCurrentUserId) });
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
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const [selectedDateValue, setSelectedDateValue] = useState(today);

  /* 心情 Modal */
  const [opened, { open, close }] = useDisclosure(false);
  const dateChangeHandler = useCallback((selectedDate) => {
    if (selectedDate) {
      setSelectedDateValue(selectedDate); // 統一設置成number格式
      open();
    }
  }, [open]);

  const [getCatDataHandler, count] = useFetch("https://cat-fact.herokuapp.com");
  const getCatData = useCallback(() => {
    getCatDataHandler();
  }, [getCatDataHandler]);
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
        <div style={{ marginTop: "15px" }} className={classes.shortcut}>
          <Grid>
            <Grid.Col xs={12} sm={4}>
              <div style={useGetComponentStyle()}>
                <Tracker type="click" bpId="0001">
                  <div className={classes["shortcut-wrapper"]}>
                    <div onClick={getCatData} className={classes["shortcut-title"]}>My Happy Action</div>
                    <div className={classes["happy-shortcut"]} ></div>
                  </div>
                </Tracker>
              </div>
            </Grid.Col>
            <Grid.Col xs={12} sm={4}>
              <div style={useGetComponentStyle()}>
                <Tracker type="click" bpId="0002">
                  <div className={classes["shortcut-wrapper"]}>
                    <div className={classes["shortcut-title"]}>My Unhappy Action</div>
                    <div className={classes["sad-shortcut"]}></div>
                  </div>
                </Tracker>
              </div>
            </Grid.Col>
            <Grid.Col xs={12} sm={4} >
              <div style={useGetComponentStyle()}>
                <Tracker type="click" bpId="0003">
                  <div className={classes["shortcut-wrapper"]}>
                    <div className={classes["shortcut-title"]}>My Support group</div>
                    <div className={classes["support-shortcut"]}></div>
                  </div>
                </Tracker>
              </div>
            </Grid.Col>
          </Grid >
        </div >
      </Grid.Col >

      {/* Date  */}
      < Grid.Col md={5} lg={4} >
        <div style={useGetComponentStyle()} >
          <div className={classes.calendar}>
            <DatePicker type="default" value={selectedDateValue} onChange={dateChangeHandler} hideOutsideDates styles={calendarStyle}
              size="md" locale="zh-tw"
            // monthLabelFormat="YYYY年 M月"
            />
          </div>
        </div>
      </Grid.Col>

      {/* Month record */}
      <Grid.Col md={7} lg={6}>
        <div className={classes["month-wrapper"]} style={useGetComponentStyle()} >
          <RecordSwiper openDailyRecord={open} monthlyRecord={monthlyRecord} setSelectedDateValue={setSelectedDateValue} />
        </div>
      </Grid.Col>

      {/* Essay recommend */}
      <Grid.Col xs={12} lg={6}>
        <div className={classes["essay-wrapper"]} style={useGetComponentStyle()} >
          <EssaySwiper commonData={commonData?.data?.essay} />
        </div>
      </Grid.Col>

      {/* 新增心情 Modal */}
      {<DailyRecordModal opened={opened} open={open} close={close} selectedDateValue={selectedDateValue} />}
    </Grid >
  );
};

export default DashboardPage;