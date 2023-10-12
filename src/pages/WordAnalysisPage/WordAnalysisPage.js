import React from 'react';
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import { Grid, useMantineTheme, SegmentedControl, } from "@mantine/core";
import classes from "./WordAnalysisPage.module.scss";
import ScoreKOLTable from './ScoreKOLTable/ScoreKOLTable';
import ScoreReality from './ScoreReality/ScoreReality';

const WordAnalysisPage = () => {
    const theme = useMantineTheme();

    return (
        <div>
            {/* Annual Month Tab*/}
            <Grid>
                <Grid.Col xs={12} md={4}>
                    <SegmentedControl
                        fullWidth
                        color={theme.colorScheme === 'light' ? "" : "button.1"}
                        data={[
                            { label: 'Month', value: 'month' },
                            { label: 'Year', value: 'year' },
                        ]}
                    />
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col xs={12} md={6}>
                    <div style={useGetComponentStyle()}>
                        <ScoreKOLTable />
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <div style={useGetComponentStyle()}>
                        <ScoreReality />
                    </div>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default WordAnalysisPage;