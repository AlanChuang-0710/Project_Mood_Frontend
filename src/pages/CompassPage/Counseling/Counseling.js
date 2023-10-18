import React from 'react';
import { Grid, } from "@mantine/core";
import { useGetComponentStyle } from "../../../styles/dayNightStyle";
import Map from './Map/Map';

const Counseling = () => {
    // const theme = useMantineTheme();

    return (
        <>
            <Grid>
                <Grid.Col xs={12} md={6}>
                    <div style={useGetComponentStyle()}>
                        <Map />
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <div style={useGetComponentStyle()}>
                        456789
                    </div>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default Counseling;