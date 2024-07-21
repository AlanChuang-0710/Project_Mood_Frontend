import { useState } from "react";
import { RouterProvider } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { FetchingProvider } from "./context/loading";
import { Notifications } from '@mantine/notifications';
import router from '@/routes/router';
import globalColor from "@/styles/globalColor";


function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  return (
    <div className="App">
      <FetchingProvider>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            // 使theme顏色置入css變量
            withCSSVariables withGlobalStyles withNormalizeCSS
            theme={{
              colorScheme, // light or dark
              colors: globalColor
              // primaryColor: 'brand', //只接受colors中的鍵
            }}>
            <Notifications position="top-right" />
            <RouterProvider router={router}></RouterProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </FetchingProvider>
    </div>
  );
};

export default App;
