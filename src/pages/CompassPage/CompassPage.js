import React, { useState } from 'react';
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import { Grid, Tabs } from "@mantine/core";
import classes from "./CompassPage.module.scss";
import Activity from './Activity/Activity';
import Counseling from './Counseling/Counseling';

const CompassPage = () => {
    // const theme = useMantineTheme();
    const [activeTab, setActiveTab] = useState('activity');

    return (
        <div>
            <Tabs value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="activity">Activity</Tabs.Tab>
                    <Tabs.Tab value="counseling">Counseling</Tabs.Tab>
                    <Tabs.Tab value="otherPlantform">Other platform</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="activity">
                    {/* Annual Month Tab*/}
                    <div className={classes["panel-wrapper"]}>
                        <Activity />
                    </div>
                </Tabs.Panel>


                <Tabs.Panel value="counseling">
                    <div className={classes["panel-wrapper"]}>
                        <Counseling />
                    </div>
                </Tabs.Panel>


                <Tabs.Panel value="otherPlantform">
                    <div className={classes["panel-wrapper"]}>
                        <Grid>
                            <Grid.Col xs={12} md={4}>
                                <div style={useGetComponentStyle()}>
                                    other plantform
                                </div>
                            </Grid.Col>
                        </Grid>

                        <Grid>
                            <Grid.Col xs={12} md={4}>
                                <div style={useGetComponentStyle()}>
                                    456789
                                </div>
                            </Grid.Col>
                        </Grid>
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default CompassPage;