import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Image, Grid, MediaQuery, Button, useMantineTheme, Modal, LoadingOverlay, Tabs, Slider, Textarea, MultiSelect, Group, FileButton, CloseButton } from "@mantine/core";
import { IconCloudUpload } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DatePicker } from '@mantine/dates';
import classes from "./DashboardPage.module.scss";
import { useGetComponentStyle } from "../styles/dayNightStyle";
import userImage from "../assets/user.png";
import RecordSwiper from "../components/RecordSwiper/RecordSwiper";
import moment from "moment";
import happy from "../assets/emotion_set/happy.svg";
import smile from "../assets/emotion_set/smile.svg";
import normal from "../assets/emotion_set/normal.svg";
import sad from "../assets/emotion_set/sad.svg";
import depressed from "../assets/emotion_set/depressed.svg";

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

  // 今日score
  const moodList = [
    {
      icon: happy,
      score: 2
    },
    {
      icon: smile,
      score: 1
    },
    {
      icon: normal,
      score: 0
    },
    {
      icon: sad,
      score: -1
    },
    {
      icon: depressed,
      score: -2
    }
  ];

  // 今日睡眠品質
  const [sleep, setSleep] = useState(8);
  const sleepMarks = [
    { value: 8, label: '8hr' },
    { value: 16, label: '16hr' },
  ];

  // 今日夢境相關
  const [dream, setDream] = useState('');

  // 今日心情
  const [score, setScore] = useState(0);

  // 今日memo
  const [memo, setMemo] = useState('');

  // 今日snapshot
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [sendServerPhotos, setSendServerPhotos] = useState([]);
  const resetRef = useRef(null);
  const clearPhotos = useCallback((index) => {
    if (index !== undefined) {
      setPreviewPhotos((preVal) => {
        let result = [...preVal];
        result.splice(index, 1);
        return result;
      });
      setSendServerPhotos((preVal) => {
        let result = [...preVal];
        result.splice(index, 1);
        return result;
      });
      resetRef.current?.();
    } else {
      setPreviewPhotos([]);
      setSendServerPhotos([]);
      resetRef.current?.();
    }
  }, []);
  const uploadImageHandler = useCallback((FileList) => {
    // 回傳FileList對象，包含各個file
    window.URL = window.URL || window.webkitURL;

    // 較驗相片的規格
    if (FileList.length > 3) {
      return alert("每日快照最多上傳三張相片!");

      /* 使用mantine notification 組件 */
      // return notifications.show({
      //     title: 'Notification',
      //     message: '每日快照最多上傳三張相片! ',
      //     position: "top-center"
      // });
    };

    if (FileList.some((file) => file.size / 1024 > 1024)) {
      return alert("每張快照不能超過1MB");
    };

    let urlArray = FileList.map((file) => URL.createObjectURL(file));
    setPreviewPhotos(urlArray);
    setSendServerPhotos(FileList);
  }, []);

  const closeModalHandler = useCallback(() => {
    close();
    setActiveTab("night");
    setSleep(8);
    setDream("");
    setScore(0);
    setMemo("");
    setPreviewPhotos([]);
    setSendServerPhotos([]);
  }, []);


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
      <Modal styles={{ header: { justifyContent: "center" }, title: { fontSize: "30px" } }} opened={opened} onClose={closeModalHandler} title={formatSelectedDate} withCloseButton={false} yOffset={200}>
        {/* <LoadingOverlay visible={opened} overlayBlur={2} /> */}
        <Tabs value={activeTab} onTabChange={setActiveTab} styles={{ tabLabel: { fontSize: "22px" }, tab: { "&:hover": { backgroundColor: theme.colorScheme === "light" ? theme.colors.button[0] : theme.colors.button[1] } } }}>

          <Tabs.List>
            <Tabs.Tab value="night">Night</Tabs.Tab>
            <Tabs.Tab value="day">Day</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="night">
            <div className={classes["panel"]}>
              <div >
                <div className={classes["title"]}>Sleep Quality</div>
                <Slider
                  mt={"md"}
                  value={sleep} onChange={setSleep}
                  marks={sleepMarks}
                  min={0}
                  max={24}
                  label={(value) => value.toFixed(1) + "hr"}
                  step={0.5}
                  precision={1}
                />
              </div>
              <div style={{ marginTop: "30px" }}>
                <div className={classes["title"]}>Dream Content</div>
                <Textarea value={dream} onChange={(event) => setDream(event.currentTarget.value)} styles={{ input: { height: "200px" } }} />
              </div>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="day">
            <div className={classes["panel"]}>
              <div>
                <div className={classes["title"]}>Mood Score</div>
                <div className={classes["mood-list"]}>
                  {moodList.map((item) => <Button key={item.score} variant="light" styles={{ root: { padding: 0 } }} onClick={() => setScore(item.score)}>
                    <img style={{ width: "40px", height: "40px" }} src={item.icon} alt="圖片" />
                  </Button>)}
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <div className={classes["title"]}>Influential People</div>
                <div>
                  <MultiSelect
                    placeholder="Pick people who mainly affect your mood today"
                    data={['Parent', 'Sibling', 'Alan', 'Myself']}
                    searchable
                  />
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <div className={classes["title"]}>Hashtags for today</div>
                <div>
                  <MultiSelect
                    placeholder="Pick hashtags for today"
                    data={['Happy', 'Angry', 'Tired', 'Exhausted']}
                    searchable
                  />
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <div className={classes["title"]}>Memo for Today</div>
                <Textarea value={memo} onChange={(event) => setMemo(event.currentTarget.value)} styles={{ input: { height: "200px" } }} />
              </div>
              <div style={{ marginTop: "20px" }}>
                <div className={classes["title"]}>Snapshot for Today</div>
                <div className={classes["upload-container"]}>
                  <Group position="center">
                    <FileButton resetRef={resetRef} onChange={uploadImageHandler} accept="image/png,image/jpeg" multiple>
                      {(props) => <Button  {...props} leftIcon={<IconCloudUpload size="1rem" />} loaderPosition="center">
                        上傳照片
                      </Button>}
                    </FileButton>
                    <Button disabled={previewPhotos.length === 0} color="red" onClick={() => clearPhotos()}>
                      清除照片
                    </Button>
                  </Group>
                </div>
                <div className={classes["photo-container"]}>
                  {previewPhotos && previewPhotos.map((file, index) =>
                    <div key={index} className={classes["upload-photo"]}>
                      <CloseButton aria-label="Close modal" className={classes.delete} radius="xl" onClick={() => clearPhotos(index)} />
                      <img src={file} alt="upload" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </Modal>

    </Grid >
  );
};

export default DashboardPage;;