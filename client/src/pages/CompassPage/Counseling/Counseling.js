import React from 'react';
import { Grid, } from "@mantine/core";
import Map from './Map/Map';
import AddressTable from './AddressTable/AddressTable';
import { useGetComponentStyle } from "../../../styles/dayNightStyle";
import classes from "./Counseling.module.scss";

const Counseling = () => {
    // const theme = useMantineTheme();

    return (
        <>
            <Grid>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <div className={classes.card}>
                                <div className={classes["psychological-option"]}>
                                </div>
                                <div style={{ textAlign: "center" }}>心理諮詢</div>
                            </div>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <div className={classes.card}>
                                <div className={classes["chat-option"]}>
                                </div>
                                <div style={{ textAlign: "center" }}>找人聊聊</div>
                            </div>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <div className={classes.card}>
                                <div className={classes["rainbow-card-option"]}>
                                </div>
                                <div style={{ textAlign: "center" }}>彩虹牌</div>
                            </div>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col xs={4} md={2}>
                    <div className={classes["card-wrapper"]}>
                        <div style={useGetComponentStyle()}>
                            <div className={classes.card}>
                                <div className={classes["meditation-option"]}>
                                </div>
                                <div style={{ textAlign: "center" }}>冥想練習</div>
                            </div>
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