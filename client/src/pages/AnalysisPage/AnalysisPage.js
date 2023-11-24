import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMantineTheme, SegmentedControl } from "@mantine/core";
import ScoreRatioPieChart from "./ScoreRatioPieChart/ScoreRatioPieChart";
import ScoreFlowChart from './ScoreFlowChart/ScoreFlowChart';
import ScoreDayBarChart from './ScoreDayBarChart/ScoreDayBarChart';
import SleepFlowChart from './SleepFlowChart/SleepFlowChart';
import ScoreKOLTable from "./ScoreKOLTable/ScoreKOLTable";
import { useGetScorePieChartDataQuery, useGetScoreLineChartDataQuery, useGetScoreDayBarDataQuery, useGetSleepLineChartDataQuery } from '../../store/api/analysisApi';
import { selectCurrentUserId } from "../../store/reducer/authSlice";
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import classes from "./AnalysisPage.module.scss";


const AnalysisPage = () => {
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

  // 獲得score pie chart資訊
  const { data: scorePieChartData } = useGetScorePieChartDataQuery({ id, startTime, endTime });

  // 獲得score line chart資訊
  const { data: scoreFlowChartData } = useGetScoreLineChartDataQuery({ id, startTime, endTime });

  // 獲得score day bar資訊
  const { data: scoreDayBarChartData } = useGetScoreDayBarDataQuery({ id, startTime, endTime });

  const { data: sleepFlowChartData } = useGetSleepLineChartDataQuery({ id, startTime, endTime });

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
            <ScoreKOLTable title={"Highly associated People"} subtitle={"People hightly associated with daily emotion"} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <ScoreKOLTable title={"Highly associated People"} subtitle={"People hightly associated with daily emotion"} />
          </div>
        </Grid.Col>
      </Grid >
    </div>
  );
};

export default AnalysisPage;