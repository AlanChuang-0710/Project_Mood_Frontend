import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMantineTheme, SegmentedControl } from "@mantine/core";
import BPSettingTable from './BPSettingTable/BPSettingTable';
import UserEventTable from "./UserEventTable/UserEventTable";
import { selectCurrentUserId } from "@/store/reducer/authSlice";
import { useGetComponentStyle } from "@/styles/dayNightStyle";

const Administrator = () => {
  const theme = useMantineTheme();
  const id = useSelector(selectCurrentUserId);
  const [value, setValue] = useState('UserAnalysis');
  const dayNightStyle = useGetComponentStyle();
  return (
    <div>
      {/* Annual analysis Tab*/}
      <Grid>
        <Grid.Col xs={12} md={6}>
          <SegmentedControl
            fullWidth
            color={theme.colorScheme === 'light' ? "" : "button.1"}
            value={value}
            onChange={setValue}
            data={[
              { label: 'App Analysis', value: 'AppAnalysis' },
              { label: 'User Analysis', value: 'UserAnalysis' },
              { label: 'Setting', value: 'setting' },
            ]}
          />
        </Grid.Col>
      </Grid>

      {value === 'AppAnalysis' && < Grid >
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

      {value === 'UserAnalysis' && < Grid >
        <Grid.Col xs={12} >
          <div style={dayNightStyle}>
            <BPSettingTable></BPSettingTable>
          </div>
        </Grid.Col>
        <Grid.Col xs={12} >
          <div style={dayNightStyle}>
            <UserEventTable></UserEventTable>
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