import React from 'react';
import { Grid, } from "@mantine/core";
import Map from '@/pages/CompassPage/Counseling/Map/Map';
import AddressTable from '@/pages/CompassPage/Counseling/AddressTable/AddressTable';
import { useGetComponentStyle } from "@/styles/dayNightStyle";
import classes from "@/pages/CompassPage/Counseling/Counseling.module.scss";
import TrackerClick from '@/components/BuryPoint/BuryPoint';

const Counseling = () => {
    // const theme = useMantineTheme();

    return (
        <>
            <Grid>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <TrackerClick name="click" bpId={`compass:counseling`}>
                                <div className={classes.card}>
                                    <div className={classes["psychological-option"]}>
                                    </div>
                                    <div style={{ textAlign: "center" }}>心理諮詢</div>
                                </div>
                            </TrackerClick>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <TrackerClick name="click" bpId={`compass:chat`}>
                                <div className={classes.card}>
                                    <div className={classes["chat-option"]}>
                                    </div>
                                    <div style={{ textAlign: "center" }}>找人聊聊</div>
                                </div>
                            </TrackerClick>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <TrackerClick name="click" bpId={`compass:rainbowCard`}>
                                <div className={classes.card}>
                                    <div className={classes["rainbow-card-option"]}>
                                    </div>
                                    <div style={{ textAlign: "center" }}>彩虹牌</div>
                                </div>
                            </TrackerClick>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <TrackerClick name="click" bpId={`compass:meditation`}>
                                <div className={classes.card}>
                                    <div className={classes["meditation-option"]}>
                                    </div>
                                    <div style={{ textAlign: "center" }}>冥想練習</div>
                                </div>
                            </TrackerClick>
                        </div>
                    </div>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col xs={12} md={6}>
                    <div style={useGetComponentStyle()}>
                        <Map />
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <div style={useGetComponentStyle()}>
                        <AddressTable
                            title={"Counseling Agency"}
                            subtitle={"The following table includes most counseling agencies in Taiwan"} />
                    </div>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Counseling;