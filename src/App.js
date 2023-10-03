import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Layout from './layout/Layout';
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';

function App() {
  const [colorScheme, setColorScheme] = useState('light');
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
              brand: ["#6a6cff", "#09c0e8", "#6a6cff", " #73db3d"],
            },
            primaryColor: 'brand', //只接受colors中的鍵
          }}>
          <Notifications />
          <Layout>
            <Routes>
              <Route path="/signup" element={<SignUpPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default App;
