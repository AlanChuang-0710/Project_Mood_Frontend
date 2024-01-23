import React from 'react';
import { Grid } from "@mantine/core";
import ActivitySwiper from './ActivitySwiper/ActivitySwiper';
import CarouselSwiper from './CarouselSwiper/CarouselSwiper';
import { useGetComponentStyle } from "../../../styles/dayNightStyle";

const Activity = () => {
    return (
        <Grid>
            <Grid.Col xs={12} md={6}>
                <div style={useGetComponentStyle()}>
                    <CarouselSwiper height={543} />
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