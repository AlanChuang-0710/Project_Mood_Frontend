import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMantineTheme, SegmentedControl, } from "@mantine/core";
import ScoreKOLTable from './ScoreKOLTable/ScoreKOLTable';
import RepeatedWordTable from './RepeatedWordTable/RepeatedWordTable';
import WorldCloudChart from './WordCloudChart/WorldCloudChart';
import { useGetDreamKeywordDataQuery } from "../../store/api/analysisApi";
import { selectCurrentUserId } from "../../store/reducer/authSlice";
import { useGetComponentStyle } from "../../styles/dayNightStyle";
// import classes from "./WordAnalysisPage.module.scss";

const WordAnalysisPage = () => {
    const theme = useMantineTheme();
    const id = useSelector(selectCurrentUserId);
    const [value, setValue] = useState('month');
    let endTime = new Date();
    endTime.setHours(0, 0, 0, 0);
    endTime = endTime.getTime();
    let startTime = new Date();
    if (value === "month") {
        // 往回推1個月
        startTime.setMonth(new Date().getMonth() - 1);
    } else {
        // 往回推1年
        startTime.setFullYear(new Date().getFullYear() - 1);
    }
    startTime.setHours(0, 0, 0, 0);
    startTime = startTime.getTime();

    const { data: dreamKeywordData } = useGetDreamKeywordDataQuery({ id, startTime, endTime });

    useEffect(() => {
        console.log(dreamKeywordData);;
    }, [dreamKeywordData]);


    return (
        <div>
            {/* Annual Month Tab*/}
            <Grid>
                <Grid.Col xs={12} md={4}>
                    <SegmentedControl
                        fullWidth
                        color={theme.colorScheme === 'light' ? "" : "button.1"}
                        value={value}
                        onChange={setValue}
                        data={[
                            { label: 'Month', value: 'month' },
                            { label: 'Year', value: 'year' },
                        ]}
                    />
                </Grid.Col>
            </Grid>

            <Grid>

                {/* world cloud */}
                <Grid.Col xs={12}>
                    <div style={useGetComponentStyle()}>
                        <WorldCloudChart height={300} dreamKeywordData={dreamKeywordData} title={"Word Cloud"} subtitle={"The larger the font of a vocabulary, the more frequently it occurred."} />
                    </div>
                </Grid.Col>

                <Grid.Col xs={12} md={7}>
                    <div style={useGetComponentStyle()}>
                        <ScoreKOLTable title={"Highly associated People"} subtitle={"People hightly associated with daily emotion"} />
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} md={5}>
                    <div style={useGetComponentStyle()}>
                        <RepeatedWordTable
                            repeatedWordData={dreamKeywordData?.data}
                            title={"Repeated words in Dream"}
                            subtitle={"The following table compiles the words that frequently appear in daily dreams."}
                        />
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} md={7}>
                    <div style={useGetComponentStyle()}>
                        <ScoreKOLTable title={"Highly associated People"} subtitle={"People hightly associated with daily emotion"} />
                    </div>
                </Grid.Col>
                <Grid.Col xs={12} md={5}>
                    <div style={useGetComponentStyle()}>
                        <RepeatedWordTable
                            title={"Repeated words in Reality"}
                            subtitle={"The following table compiles the words that frequently appear in reality."}
                        />
                    </div>
                </Grid.Col>
            </Grid>

        </div>
    );
};

export default WordAnalysisPage;