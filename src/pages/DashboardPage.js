import React, { useState, useEffect, useMemo } from 'react';
import { Image, Grid, MediaQuery, Button, useMantineTheme, Modal, LoadingOverlay, Tabs } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { DatePicker } from '@mantine/dates';
import classes from "./DashboardPage.module.scss";
import { useGetComponentStyle } from "../styles/dayNightStyle";
import userImage from "../assets/user.png";
import RecordSwiper from "../components/RecordSwiper/RecordSwiper";
import moment from "moment";

const DashboardPage = () => {
  const theme = useMantineTheme();

  /* date relative */
  const [selectedDateValue, setSelectedDateValue] = useState(new Date().setHours(0, 0, 0, 0));
  const formatSelectedDate = useMemo(() => {
    const date = moment(selectedDateValue);
    return date.format('YYYY-MM-DD');
  }, [selectedDateValue]);

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

  /* 心情 Modal */
  const [opened, { open, close }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState("night");

  useEffect(() => {
    if (selectedDateValue) {
      console.log(selectedDateValue);
      open();
    }
  }, [selectedDateValue]);

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
        <div style={{ ...useGetComponentStyle(), marginTop: "15px" }}>
          <Grid>
            <Grid.Col span={4}>
              1
            </Grid.Col>
            <Grid.Col span={4}>
              1
            </Grid.Col>
            <Grid.Col span={4} >
              1
            </Grid.Col>
          </Grid >
        </div >
      </Grid.Col >

      {/* Date  */}
      < Grid.Col md={5} lg={4} >
        <div style={useGetComponentStyle()} >
          <div className={classes.calendar}>
            <DatePicker allowDeselect value={selectedDateValue} onChange={setSelectedDateValue} hideOutsideDates styles={calendarStyle}
              size="md" locale="zh-tw"
            // monthLabelFormat="YYYY年 M月"
            />
          </div>
        </div>
      </Grid.Col>

      {/* Month record */}
      <Grid.Col md={7} lg={7}>
        <div className={classes["month-wrapper"]} style={useGetComponentStyle()} >
          <RecordSwiper></RecordSwiper>
        </div>
      </Grid.Col>

      {/* Lesson recommend */}
      <Grid.Col xs={12} lg={5}>
        <div className={classes["lesson-wrapper"]} style={useGetComponentStyle()} >
          123456
        </div>
      </Grid.Col>

      {/* 新增心情 Modal */}
      <Modal styles={{ content: useGetComponentStyle(), header: useGetComponentStyle(), title: { fontSize: "30px" } }} opened={opened} onClose={close} title={formatSelectedDate} yOffset={200}>
        {/* <LoadingOverlay visible={opened} overlayBlur={2} /> */}
        <Tabs value={activeTab} onTabChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="night">Night</Tabs.Tab>
            <Tabs.Tab value="day">Day</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="night">First panel</Tabs.Panel>
          <Tabs.Panel value="day">Second panel</Tabs.Panel>
        </Tabs>
      </Modal>

    </Grid >
  );
};

export default DashboardPage;;