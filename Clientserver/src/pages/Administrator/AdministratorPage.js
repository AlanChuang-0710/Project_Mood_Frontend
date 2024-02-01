import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMantineTheme, SegmentedControl } from "@mantine/core";
import EventSettingTable from './EventSettingTable/EventSettingTable';
import { selectCurrentUserId } from "@/store/reducer/authSlice";
import { useGetComponentStyle } from "@/styles/dayNightStyle";

const Administrator = () => {
  const theme = useMantineTheme();
  const id = useSelector(selectCurrentUserId);
  const [value, setValue] = useState('AppAnalysis');
  const dayNightStyle = useGetComponentStyle();
  return (
    <div>
      {/* Annual analysis Tab*/}
      <Grid>
        <Grid.Col xs={12} md={4}>
          <SegmentedControl
            fullWidth
            color={theme.colorScheme === 'light' ? "" : "button.1"}
            value={value}
            onChange={setValue}
            data={[
              { label: 'App Analysis', value: 'AppAnalysis' },
              { label: 'Setting', value: 'setting' },
            ]}
          />
        </Grid.Col>
      </Grid>

      {value === 'AppAnalysis' && < Grid >
        <Grid.Col xs={12} >
          <div style={dayNightStyle}>
            <EventSettingTable></EventSettingTable>
          </div>
        </Grid.Col>
        <Grid.Col xs={12} >
          <div style={dayNightStyle}>
            用戶數據
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <div style={dayNightStyle}>
            前端網頁服務器: 端口、流量
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <div style={dayNightStyle}>
            數據庫服務器: 端口、流量
          </div>
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <div style={dayNightStyle}>
            分析服務器: 端口、流量
          </div>
        </Grid.Col>
      </ Grid >}

      {value === 'setting' && < Grid >
        <Grid.Col xs={12} >
          <div style={dayNightStyle}>
            用戶頁面顯示設定 essay swiper
          </div>
        </Grid.Col>
        <Grid.Col xs={12} >
          <div style={dayNightStyle}>
            用戶頁面顯示設定 counseling agency
          </div>
        </Grid.Col>
      </ Grid >}
    </div >
  );
};

export default Administrator;