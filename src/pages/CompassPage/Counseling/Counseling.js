import React, { useState } from 'react';
import { Grid, } from "@mantine/core";
import { useGetComponentStyle } from "../../../styles/dayNightStyle";
import Map from './Map/Map';

const Counseling = () => {
    // const theme = useMantineTheme();
    const [test, setTest] = useState(1);

    return (
        <>
            <button onClick={() => setTest((prev) => ++prev)}>click</button>
            <h3>{test}</h3>
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