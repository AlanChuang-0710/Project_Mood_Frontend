import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMantineTheme, SegmentedControl } from "@mantine/core";
import ScoreRatioPieChart from "@/pages/AnalysisPage/ScoreRatioPieChart/ScoreRatioPieChart";
import ScoreFlowChart from '@/pages/AnalysisPage/ScoreFlowChart/ScoreFlowChart';
import ScoreDayBarChart from '@/pages/AnalysisPage/ScoreDayBarChart/ScoreDayBarChart';
import SleepFlowChart from '@/pages/AnalysisPage/SleepFlowChart/SleepFlowChart';
import ScoreAssociatedChart from "@/pages/AnalysisPage/ScoreAssociatedChart/ScoreAssociatedChart";
import SleepScoreScatterChart from '@/pages/AnalysisPage/SleepScoreScatterChart/SleepScoreScatterChart';
import SleepHistogram from "@/pages/AnalysisPage/SleepHistogram/SleepHistogram";
import AnalysisMsg from "@/pages/AnalysisPage/AnalysisMsg/AnalysisMsg";
import { useGetScorePieChartDataQuery, useGetScoreLineChartDataQuery, useGetScoreDayBarDataQuery, useGetSleepLineChartDataQuery, useGetTagsScoreDataQuery, useGetKOLScoreDataQuery } from '@/store/api/analysisApi';
import { selectCurrentUserId, selectCurrentUsername } from "@/store/reducer/authSlice";
import { useGetComponentStyle } from "@/styles/dayNightStyle";
import { getStartEndTime } from "@/utils/public";
import { warnNotify } from '@/utils/notify';
import classes from "@/pages/AnalysisPage/AnalysisPage.module.scss";

const AnalysisPage = () => {
  const theme = useMantineTheme();
  const id = useSelector(selectCurrentUserId);
  const username = useSelector(selectCurrentUsername);

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


  const [anaMsg, setAnaMsg] = useState({
    depressRatio: "",
    recordedCount: "",
    depressDay: "",
    volatility: "",
    happyKOL: "",
    depressKOL: ""
  });


  // 心情佔比
  useEffect(() => {
    if (scorePieChartData) {
      let depressionCount = scorePieChartData.data.data[0].count;
      let totalCount = scorePieChartData.data.total;
      let nullCount = scorePieChartData.data.data[5].count;
      let recordedCount = totalCount - nullCount;
      let depressRatio = (depressionCount / recordedCount).toFixed(2, 10);
      setAnaMsg((preVal) => ({ ...preVal, recordedCount, depressRatio }));
    };

  }, [scorePieChartData]);

  // 睡眠時段主要分布範圍 (幾個小時到幾個小時之間)
  useEffect(() => {
    if (sleepFlowChartData) {
      console.log("sleepFlowChartData", sleepFlowChartData);
    }
  }, [sleepFlowChartData]);

  // 波動率 (介於0 ~ 2之間)，大於1.5認定為波動較大。
  useEffect(() => {
    if (scoreFlowChartData) {
      let scoreArray = [];

      scoreFlowChartData.data.forEach((item) => {
        if (item.score !== null) {
          scoreArray.push(item.score);
        }
      });
      function calculateStandardDeviation(data) {
        const n = data.length;

        if (n === 0) return 0;

        // 計算平均值
        const mean = data.reduce((sum, value) => sum + value, 0) / n;

        // 計算每個數據點與平均值的差異的平方
        const squaredDifferences = data.map(value => Math.pow(value - mean, 2));

        // 計算平方差的平均值，然後取平方根得到標準差
        const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / n;
        const standardDeviation = Math.sqrt(variance).toFixed(2);
        return standardDeviation;
      };
      let scoreVolatility = calculateStandardDeviation(scoreArray);
      setAnaMsg((preVal) => ({ ...preVal, volatility: scoreVolatility }));
    }
  }, [scoreFlowChartData]);

  // 星期幾低潮佔比較高，建議可以特別注意 (特定星期幾depressed比例高於特定星期幾的1/2，則認定特定星期幾具有較高比例不開心)
  useEffect(() => {
    if (scoreDayBarChartData) {
      const dayArrMapping = ["Sunday", "Saturday", "Friday", "Thursday", "Wednesday", "Tuesday", "Monday"];
      let overDepressedArr = [];
      scoreDayBarChartData.data.barData[0].forEach((item, index) => {
        if (item / (scoreDayBarChartData.data.total / 7) >= 0.5) {
          overDepressedArr.push(dayArrMapping[index]);
        };
      });
      setAnaMsg((preVal) => ({ ...preVal, depressDay: overDepressedArr.join(", ") }));
    }
  }, [scoreDayBarChartData]);

  // 心情相關人物
  useEffect(() => {
    if (scoreKOLChartData?.data) {
      let data = scoreKOLChartData.data;
      let happyKOL = data["score2"].map((item) => item[0]).join(", ");
      let depressKOL = data["score-2"].map((item) => item[0]).join(", ");
      setAnaMsg((preVal) => ({ ...preVal, happyKOL, depressKOL }));
    }
  }, [scoreKOLChartData]);

  // 數據不足的提示
  useEffect(() => {
    if (scorePieChartData) {
      let totalCount = scorePieChartData.data.total;
      let nullCount = scorePieChartData.data.data[5].count;
      if ((nullCount / totalCount).toFixed(2) * 100 > 80) warnNotify({
        message: "The amount of recorded data is insufficient, rendering the analysis potentially inconclusive",
        autoClose: 5000
      });
    };
  }, [scorePieChartData]);


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
        <Grid.Col xs={12} md={4}>
          <div style={useGetComponentStyle()}>
            <ScoreDayBarChart height={300} scoreDayBarChartData={scoreDayBarChartData} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={8}>
          <div style={useGetComponentStyle()}>
            <SleepFlowChart height={300} sleepFlowChartData={sleepFlowChartData} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <div style={useGetComponentStyle()}>
            <SleepHistogram height={350} sleepFlowChartData={sleepFlowChartData} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <div style={useGetComponentStyle()}>
            <SleepScoreScatterChart height={350} sleepFlowChartData={sleepFlowChartData} scoreFlowChartData={scoreFlowChartData} />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <div style={useGetComponentStyle()}>
            {/* <div className={classes["score-report1"]}>
              過去一{value === "month" ? "個月" : "年"}當中，XXX總共記錄了___天心情筆記。從筆記中，我們發現開心佔比約___%；低潮佔比約___%。
            </div> */}
            <AnalysisMsg msg={anaMsg} time={value} username={username} />
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
        {/* <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <div className={classes["score-report1"]}>
              數據分析
            </div>
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <div style={useGetComponentStyle()}>
            <div className={classes["score-report2"]}>
              數據分析
            </div>
          </div>
        </Grid.Col> */}
      </Grid >
    </div>
  );
};

export default AnalysisPage;