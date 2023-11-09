import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import Layout from './layout/Layout';
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AnalysisPage from "./pages/AnalysisPage/AnalysisPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import CompassPage from "./pages/CompassPage/CompassPage";
import WordAnalysisPage from "./pages/WordAnalysisPage/WordAnalysisPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AdministratorPage from "./pages/Administrator/AdministratorPage";
function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

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
              light: ["#fff"], // 0是白色背景 
              night: ["#2b2c40"], // 0是深藍背景 
              tool: ["#717b8a", "#9BA2AD"], // 0是灰色 用於工具 1是淺灰 用於日曆
              mood: [],
              button: ["#e7f5ff", "#33486B"] //0是light下btn的顏色，1是dark下btn的顏色
            },
            // primaryColor: 'brand', //只接受colors中的鍵
          }}>
          <Notifications />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<Navigate to="/signup/create" />}></Route>
            <Route path="/signup/:tabValue" element={<SignUpPage />}></Route>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />}></Route>
              <Route path="/account" element={<AccountPage />}></Route>
              <Route path="/analysis" element={<AnalysisPage />}></Route>
              <Route path="/word-analysis" element={<WordAnalysisPage />}></Route>
              <Route path="/compass" element={<CompassPage />}></Route>
              <Route path="/administrator" element={<AdministratorPage />}></Route>
            </Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
