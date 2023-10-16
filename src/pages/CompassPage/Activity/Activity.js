import React from 'react';
import { Grid, useMantineTheme } from "@mantine/core";
import { useGetComponentStyle } from "../../../styles/dayNightStyle";
import ActivitySwiper from './ActivitySwiper/ActivitySwiper';
import CarouselSwiper from './CarouselSwiper/CarouselSwiper';

const Activity = () => {
    return (
        <Grid>
            <Grid.Col xs={12} md={6}>
                <div style={useGetComponentStyle()}>
                    <CarouselSwiper height={550} />
                </div>
            </Grid.Col>
            <Grid.Col xs={12} md={6}>
                <div style={useGetComponentStyle()}>
                    <ActivitySwiper height={550} />
                </div>
            </Grid.Col>
        </Grid>
    );
};

export default Activity;