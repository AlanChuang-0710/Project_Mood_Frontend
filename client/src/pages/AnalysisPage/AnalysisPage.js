import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMantineTheme, SegmentedControl } from "@mantine/core";
import ScoreRatioPieChart from "./ScoreRatioPieChart/ScoreRatioPieChart";
import ScoreFlowChart from './ScoreFlowChart/ScoreFlowChart';
import ScoreDayBarChart from './ScoreDayBarChart/ScoreDayBarChart';
import SleepFlowChart from './SleepFlowChart/SleepFlowChart';
import ScoreAssociatedChart from "./ScoreAssociatedChart/ScoreAssociatedChart";
import { useGetScorePieChartDataQuery, useGetScoreLineChartDataQuery, useGetScoreDayBarDataQuery, useGetSleepLineChartDataQuery, useGetTagsScoreDataQuery, useGetKOLScoreDataQuery } from '../../store/api/analysisApi';
import { selectCurrentUserId } from "../../store/reducer/authSlice";
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import { getStartEndTime } from "../../utils/getStartEndTime";
import classes from "./AnalysisPage.module.scss";


const AnalysisPage = () => {
  const theme = useMantineTheme();
  const id = useSelector(selectCurrentUserId);

  const [value, setValue] = useState('month');
  const { startTime, endTime } = getStartEndTime(value);

  // 獲得score pie chart資訊
  const { data: scorePieChartData } = useGetScorePieChartDataQuery({ id, startTime, endTime });

  // 獲得score line chart資訊
  const { data: scoreFlowChartData } = useGetScoreLineChartDataQuery({ id, startTime, endTime });

  // 獲得score day bar資訊
  const { data: scoreDayBarChartData } = useGetScoreDayBarDataQuery({ id, startTime, endTime });

  const { data: sleepFlowChartData } = useGetSleepLineChartDataQuery({ id, startTime, endTime });

  const { data: scoreTagsChartData } = useGetTagsScoreDataQuery({ id, startTime, endTime });

  const { data: scoreKOLChartData } = useGetKOLScoreDataQuery({ id, startTime, endTime });

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

      {/* Chart */}
      <Grid>
        <Grid.Col xs={12} md={4}>
          <div style={useGetComponentStyle()}>
            <ScoreRatioPieChart height={250} scorePieChartData={scorePieChartData} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={8}>
          <div style={useGetComponentStyle()}>
            <ScoreFlowChart height={250} scoreFlowChartData={scoreFlowChartData} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <ScoreDayBarChart height={350} scoreDayBarChartData={scoreDayBarChartData} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <div className={classes["score-report1"]}>
              數據分析
            </div>
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <SleepFlowChart height={350} sleepFlowChartData={sleepFlowChartData} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <div className={classes["score-report2"]}>
              數據分析
            </div>
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <ScoreAssociatedChart title={"Top 5 highly-associated People"} subtitle={"People hightly associated with daily emotion"} data={scoreKOLChartData} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <ScoreAssociatedChart title={"Top 5 highly-associated Tags"} subtitle={"Tags hightly associated with daily emotion"} data={scoreTagsChartData} />
          </div>
        </Grid.Col>
      </Grid >
    </div>
  );
};

export default AnalysisPage;