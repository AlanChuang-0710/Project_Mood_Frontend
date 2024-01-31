import React from 'react';
import { Grid, } from "@mantine/core";
import Map from '@/pages/CompassPage/Counseling/Map/Map';
import AddressTable from '@/pages/CompassPage/Counseling/AddressTable/AddressTable';
import { useGetComponentStyle } from "@/styles/dayNightStyle";
import classes from "@/pages/CompassPage/Counseling/Counseling.module.scss";
import Tracker from '@/components/BuryPoint/BuryPoint';

const Counseling = () => {
    // const theme = useMantineTheme();

    return (
        <>
            <Grid>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <Tracker type="click" bpId="0005">
                                <div className={classes.card}>
                                    <div className={classes["psychological-option"]}>
                                    </div>
                                    <div style={{ textAlign: "center" }}>心理諮詢</div>
                                </div>
                            </Tracker>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <Tracker type="click" bpId="0006">
                                <div className={classes.card}>
                                    <div className={classes["chat-option"]}>
                                    </div>
                                    <div style={{ textAlign: "center" }}>找人聊聊</div>
                                </div>
                            </Tracker>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <Tracker type="click" bpId="0007">
                                <div className={classes.card}>
                                    <div className={classes["rainbow-card-option"]}>
                                    </div>
                                    <div style={{ textAlign: "center" }}>彩虹牌</div>
                                </div>
                            </Tracker>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <Tracker type="click" bpId="0008">
                                <div className={classes.card}>
                                    <div className={classes["meditation-option"]}>
                                    </div>
                                    <div style={{ textAlign: "center" }}>冥想練習</div>
                                </div>
                            </Tracker>
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