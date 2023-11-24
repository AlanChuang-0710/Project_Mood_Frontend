import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMantineTheme, SegmentedControl, } from "@mantine/core";
// import ScoreKOLTable from './ScoreKOLTable/ScoreKOLTable';
import RepeatedWordTable from './RepeatedWordTable/RepeatedWordTable';
import WorldCloudChart from './WordCloudChart/WorldCloudChart';
import { useGetDreamKeywordDataQuery, useGetMemoKeywordDataQuery } from "../../store/api/analysisApi";
import { selectCurrentUserId } from "../../store/reducer/authSlice";
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import { getStartEndTime } from "../../utils/getStartEndTime";
// import classes from "./WordAnalysisPage.module.scss";

const WordAnalysisPage = () => {
    const theme = useMantineTheme();
    const id = useSelector(selectCurrentUserId);
    const [value, setValue] = useState('month');
    const { startTime, endTime } = getStartEndTime(value);
    const { data: dreamKeywordData } = useGetDreamKeywordDataQuery({ id, startTime, endTime });
    const { data: memoKeywordData } = useGetMemoKeywordDataQuery({ id, startTime, endTime });


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
                <Grid.Col xs={12} md={6}>
                    <Grid>
                        <Grid.Col xs={12}>
                            <div style={useGetComponentStyle()}>
                                <WorldCloudChart height={300} keywordData={dreamKeywordData?.data} title={"Word Cloud"} subtitle={"The larger the font of a vocabulary, the more frequently it occurred."} />
                            </div>
                        </Grid.Col>
                        <Grid.Col xs={12}>
                            <div style={useGetComponentStyle()}>
                                <RepeatedWordTable
                                    repeatedWordData={dreamKeywordData?.data}
                                    title={"Repeated words in Dream"}
                                    subtitle={"The following table compiles the words that frequently appear in daily dreams."}
                                />
                            </div>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>

                <Grid.Col xs={12} md={6}>
                    <Grid>
                        <Grid.Col xs={12}>
                            <div style={useGetComponentStyle()}>
                                <WorldCloudChart height={300} keywordData={memoKeywordData?.data} title={"Word Cloud"} subtitle={"The larger the font of a vocabulary, the more frequently it occurred."} />
                            </div>
                        </Grid.Col>
                        <Grid.Col xs={12}>
                            <div style={useGetComponentStyle()}>
                                <RepeatedWordTable
                                    repeatedWordData={memoKeywordData?.data}
                                    title={"Repeated words in Reality"}
                                    subtitle={"The following table compiles the words that frequently appear in reality."}
                                />
                            </div>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default WordAnalysisPage;