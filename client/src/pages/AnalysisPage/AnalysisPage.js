import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMantineTheme, SegmentedControl } from "@mantine/core";
import ScoreRatioPieChart from "./ScoreRatioPieChart/ScoreRatioPieChart";
import ScoreFlowChart from './ScoreFlowChart/ScoreFlowChart';
import ScoreDayChart from './ScoreDayChart/ScoreDayChart';
import SleepFlowChart from './SleepFlowChart/SleepFlowChart';
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
  const { data: scoreFlowChartData, isSuccess: scoreFlowChartIsSuccess } = useGetScoreLineChartDataQuery({ id, startTime, endTime });

  // 獲得score day bar資訊
  const { data: scoreDayBarData, isSuccess: scoreDayBarDataIsSuccess } = useGetScoreDayBarDataQuery({ id, startTime, endTime });

  const { data: sleepLineChartData, isSuccess: sleepLineChartIsSuceess } = useGetSleepLineChartDataQuery({ id, startTime, endTime });

  useEffect(() => {
    if (scoreFlowChartIsSuccess) {
      // console.log(scoreFlowChartData);
    }
  }, [scoreFlowChartData, scoreFlowChartIsSuccess]);

  useEffect(() => {
    if (scoreDayBarDataIsSuccess) {
      // console.log(scoreDayBarData);
    }
  }, [scoreDayBarData, scoreDayBarDataIsSuccess]);

  useEffect(() => {
    if (sleepLineChartIsSuceess) {
      // console.log(sleepLineChartData);
    }
  }, [sleepLineChartData, sleepLineChartIsSuceess]);
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
            <ScoreDayChart height={350} />
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
            <SleepFlowChart height={350} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <div className={classes["score-report2"]}>
              數據分析
            </div>
          </div>
        </Grid.Col>
      </Grid >
    </div>
  );
};

export default AnalysisPage;