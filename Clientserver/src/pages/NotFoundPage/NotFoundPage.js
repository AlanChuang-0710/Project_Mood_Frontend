import React from 'react';
import ErrorImage from "@/assets/404_error/404error.svg";
// import { useMantineTheme } from "@mantine/core";
const NotFoundPage = () => {
    // const theme = useMantineTheme();
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#FFF" }}>
            <img style={{ width: "60%" }} src={ErrorImage} alt="404 Not Found" />
        </div>
    );
};

export default NotFoundPage; 