import React from 'react';
import classes from "./AnalysisPage.module.scss";
import { useGetComponentStyle } from "../../styles/dayNightStyle";
import { Grid, useMantineTheme, } from "@mantine/core";
import ScoreRatioPieChart from "./ScoreRatioPieChart/ScoreRatioPieChart";
import ScoreFlowChart from './ScoreFlowChart/ScoreFlowChart';
import ScoreDayChart from './ScoreDayChart/ScoreDayChart';

const AnalysisPage = () => {

  return (
    <div>
      <Grid>
        <Grid.Col xs={4}>
          <div style={useGetComponentStyle()}>
            <ScoreRatioPieChart />
          </div>
        </Grid.Col>
        <Grid.Col xs={8}>
          <div style={useGetComponentStyle()}>
            <ScoreFlowChart />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <ScoreDayChart />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            1
          </div>
        </Grid.Col>
      </Grid >
    </div>
  );
};

export default AnalysisPage;