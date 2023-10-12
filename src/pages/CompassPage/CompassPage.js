import React from 'react';
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import { Grid, useMantineTheme, SegmentedControl } from "@mantine/core";

const CompassPage = () => {
    const theme = useMantineTheme();

    return (
        <div>
            {/* Annual Month Tab*/}
            <Grid>
                <Grid.Col xs={12} md={4}>
                    <div style={useGetComponentStyle()}>
                        123456
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
    );
};

export default CompassPage;