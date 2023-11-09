import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMantineTheme, SegmentedControl } from "@mantine/core";
import ScoreRatioPieChart from "./ScoreRatioPieChart/ScoreRatioPieChart";
import ScoreFlowChart from './ScoreFlowChart/ScoreFlowChart';
import ScoreDayChart from './ScoreDayChart/ScoreDayChart';
import SleepFlowChart from './SleepFlowChart/SleepFlowChart';
import { useGetScorePieChartDataQuery } from '../../store/api/analysisApi';
import { selectCurrentUserId } from "../../store/reducer/authSlice";
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import classes from "./AnalysisPage.module.scss";


const AnalysisPage = () => {
  const theme = useMantineTheme();
  const [value, setValue] = useState('month');
  let startTime = new Date();
  startTime.setDate(1);
  startTime.setHours(0, 0, 0, 0);
  startTime = startTime.getTime();
  let endTime = new Date();
  endTime.setMonth(new Date().getMonth() + 1, 1);
  endTime.setDate(endTime.getDate() - 1);
  endTime.setHours(0, 0, 0, 0);
  endTime = endTime.getTime();
  const { data: pieChartData, isSuccess: pieChartIsSuccess } = useGetScorePieChartDataQuery({ id: useSelector(selectCurrentUserId), startTime, endTime });

  useEffect(() => {
    if (pieChartIsSuccess) {
      console.log(pieChartData);
    }
  }, [pieChartData, pieChartIsSuccess]);

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
            <ScoreRatioPieChart height={250} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={8}>
          <div style={useGetComponentStyle()}>
            <ScoreFlowChart height={250} />
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