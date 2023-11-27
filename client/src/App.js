import { useRoutes } from 'react-router-dom';
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import routes from './routes/router';
function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  // 引入路由
  const routeList = useRoutes(routes);

  return (
    <div className="App">
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          // 使theme顏色置入css變量
          withCSSVariables withGlobalStyles withNormalizeCSS
          theme={{
            colorScheme, // light or dark
            colors: { // 設定主題色
              brand: ["#6a6cff", "#09c0e8", "#73db3d", "#f7e048"], // 藍  青藍 青綠 淡橘黃
              emotion: ["#d12a2f", "#d65b37", "#fbae43", "#8fc962", "#3ab34c", "#A9A9A9"], // 共六種: 5情緒顏色(排序:憂鬱到開心)+1無紀錄顏色
              light: ["#fff"], // 0是白色背景 
              night: ["#2b2c40"], // 0是深藍背景 
              tool: ["#717b8a", "#9BA2AD"], // 0是灰色 用於工具 1是淺灰 用於日曆
              mood: [],
              button: ["#e7f5ff", "#33486B"] //0是light下btn的顏色，1是dark下btn的顏色
            },
            // primaryColor: 'brand', //只接受colors中的鍵
          }}>
          <Notifications />
          {routeList}
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
