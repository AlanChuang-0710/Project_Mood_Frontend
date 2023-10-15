import React from 'react';
import { Grid, useMantineTheme, Tabs } from "@mantine/core";
import { useGetComponentStyle } from "../../../styles/dayNightStyle";

const Activity = () => {
    return (
        <Grid>
            <Grid.Col xs={12} md={6}>
                <div style={useGetComponentStyle()}>
                    activity
                </div>
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
                <div style={useGetComponentStyle()}>
                    456789
                </div>
            </Grid.Col>
        </Grid>
    );
};

export default Activity;