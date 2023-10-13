import React from 'react';
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import { Grid, useMantineTheme, SegmentedControl, } from "@mantine/core";
import classes from "./WordAnalysisPage.module.scss";
import ScoreKOLTable from './ScoreKOLTable/ScoreKOLTable';
import RepeatedWordTable from './RepeatedWordTable/RepeatedWordTable';

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
                <Grid.Col xs={12} md={7}>
                    <div style={useGetComponentStyle()}>
                        <ScoreKOLTable title={"Highly associated People"} subtitle={"People hightly associated with daily emotion"} />
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} md={5}>
                    <div style={useGetComponentStyle()}>
                        <RepeatedWordTable
                            title={"Repeated words in Dream"}
                            subtitle={"The following table compiles the words that frequently appear in daily dreams."}
                        />
                    </div>
                </Grid.Col>
            </Grid>

        </div>
    );
};

export default WordAnalysisPage;