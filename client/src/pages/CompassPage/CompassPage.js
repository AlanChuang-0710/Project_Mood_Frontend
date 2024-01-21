import React, { useState } from 'react';
import { Grid, Tabs, useMantineTheme, SegmentedControl } from "@mantine/core";
import Activity from '@/pages/CompassPage/Activity/Activity';
import Counseling from '@/pages/CompassPage/Counseling/Counseling';
import classes from "@/pages/CompassPage/CompassPage.module.scss";
import { useGetComponentStyle } from "@/styles/dayNightStyle";

const CompassPage = () => {
    // const theme = useMantineTheme();
    const [activeTab, setActiveTab] = useState('counseling');
    const theme = useMantineTheme();
    return (
        <div>
            <Grid>
                <Grid.Col xs={12} md={5}>
                    <SegmentedControl
                        fullWidth
                        color={theme.colorScheme === 'light' ? "" : "button.1"}
                        value={activeTab}
                        onChange={setActiveTab}
                        data={[
                            { label: 'Activity', value: 'activity' },
                            { label: 'Counseling', value: 'counseling' },
                            { label: 'Other platform', value: 'otherPlantform' },
                        ]}
                    />
                </Grid.Col>
            </Grid>
            <Tabs value={activeTab} >
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