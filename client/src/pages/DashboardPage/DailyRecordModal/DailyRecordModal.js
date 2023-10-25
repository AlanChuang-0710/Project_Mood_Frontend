import React, { useState, useCallback, useRef, useMemo } from 'react';
import { Image, Grid, Button, Modal, Tabs, Slider, useMantineTheme, Textarea, MultiSelect, Group, FileButton, CloseButton } from "@mantine/core";
import classes from "./DailyRecordModal.module.scss";
import happy from "../../../assets/emotion_set/happy.svg";
import smile from "../../../assets/emotion_set/smile.svg";
import normal from "../../../assets/emotion_set/normal.svg";
import sad from "../../../assets/emotion_set/sad.svg";
import depressed from "../../../assets/emotion_set/depressed.svg";
import { IconCloudUpload } from '@tabler/icons-react';
import moment from "moment";
import { useUpdateUserFeelingMutation } from "../../../store/api/feelingApi";
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from "../../../store/reducer/authSlice";

const DailyRecordModal = ({ opened, open, close, selectedDateValue }) => {
    const id = useSelector(selectCurrentUserId);
    const theme = useMantineTheme();
    const [updateUserFeeling, { data }] = useUpdateUserFeelingMutation();

    const formatSelectedDate = useMemo(() => {
        const date = moment(selectedDateValue);
        return date.format('YYYY-MM-DD');
    }, [selectedDateValue]);

    /* 心情 Modal */

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
    }, [close]);

    const updateDailyRecord = useCallback(async () => {
        const result = await updateUserFeeling({
            id,
            data: {
                timestamp: "2023-08-27T00:00:00.000Z",
                score: 8,
                imgURL: sendServerPhotos,
                tags: ["happy"],
                KOL: ["Wang", "Jessy^^", "$Liu Wang", "18"],
                dream: "我想要吃酸菜魚、土豆絲",
                memo: "今天心情很差，有點抑鬱，可能是跟朋友出去的關係吧?",
                sleep: 12,
            }
        });
        console.log(result);
    }, [sendServerPhotos, updateUserFeeling]);

    return (
        <Modal styles={{
            header: { justifyContent: "center" }, title: { fontSize: "30px" },
            content: { maxHeight: "540px !important" }
        }} opened={opened} onClose={closeModalHandler} title={formatSelectedDate} withCloseButton={false} yOffset={100}>
            {/* <LoadingOverlay visible={opened} overlayBlur={2} /> */}
            <Tabs value={activeTab} onTabChange={setActiveTab} styles={{ tabLabel: { fontSize: "22px" }, tab: { "&:hover": { backgroundColor: theme.colorScheme === "light" ? theme.colors.button[0] : theme.colors.button[1] } } }}>

                <Tabs.List >
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
                    <div className={classes["panel"]} >
                        <div>
                            <div className={classes["title"]}>Mood Score</div>
                            <div className={classes["mood-list"]}>
                                {moodList.map((item) => <Button key={item.score} variant={item.score === score ? "light" : ""} styles={{ root: { padding: 0 } }} onClick={() => setScore(item.score)}>
                                    <img style={{ width: "40px", height: "40px" }} src={item.icon} alt="Mood" />
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
                            <div className={classes["title"]}>Hashtags</div>
                            <div>
                                <MultiSelect
                                    placeholder="Pick hashtags for today"
                                    data={['Happy', 'Angry', 'Tired', 'Exhausted']}
                                    searchable
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <div className={classes["title"]}>Memo</div>
                            <Textarea value={memo} onChange={(event) => setMemo(event.currentTarget.value)} styles={{ input: { height: "200px" } }} />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <div className={classes["title"]}>Snapshot</div>
                            {/* <div className={classes["subtitle"]}>Maximum 3 photos</div> */}
                            <div className={classes["snapshot"]}>
                                <div className={classes["button-container"]}>
                                    <Group position="center">
                                        <FileButton resetRef={resetRef} onChange={uploadImageHandler} accept="image/png,image/jpeg" multiple>
                                            {(props) => <Button variant='default'  {...props} loaderPosition="center">
                                                上傳照片
                                            </Button>}
                                        </FileButton>
                                        <Button disabled={previewPhotos.length === 0} color="red" onClick={() => clearPhotos()}>
                                            清除照片
                                        </Button>
                                    </Group>
                                </div>
                                <Grid className={classes["photo-container"]}>
                                    {previewPhotos && previewPhotos.map((file, index) =>
                                        <Grid.Col sm={12} key={index} >
                                            <div className={classes["upload-photo"]}>
                                                <CloseButton aria-label="Close modal" className={classes.delete} radius="xl" onClick={() => clearPhotos(index)} />
                                                <Image radius="md" fit="contain" src={file} alt="Upload" />
                                            </div>
                                        </Grid.Col>
                                    )}
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Tabs.Panel>

                <div style={{ textAlign: "center", paddingTop: "7px" }}>
                    <Button leftIcon={<IconCloudUpload size="1rem" />} loading={false} onClick={updateDailyRecord}>
                        Save Record
                    </Button>
                </div>
            </Tabs>

        </Modal>
    );
};

export default DailyRecordModal;