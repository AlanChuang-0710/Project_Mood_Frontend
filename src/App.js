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
        <MantineProvider theme={{ colorScheme }}>
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
