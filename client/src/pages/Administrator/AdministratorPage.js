import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, useMantineTheme, SegmentedControl } from "@mantine/core";
import { selectCurrentUserId } from "../../store/reducer/authSlice";

const Administrator = () => {
  const theme = useMantineTheme();
  const id = useSelector(selectCurrentUserId);
  const [value, setValue] = useState('analysis');

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
              { label: 'Analysis', value: 'analysis' },
              { label: 'Setting', value: 'setting' },
            ]}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Administrator;