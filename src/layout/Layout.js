import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, SimpleGrid, Group, Header, MediaQuery, Avatar } from '@mantine/core';
import classes from "./layout.module.scss";
import { HouseDoor, Gear, Bell, Search } from "react-bootstrap-icons";
import LightDarkButton from "../components/LightDarkButton";
// import { useViewportSize } from '@mantine/hooks';

import {
    AppShell,
    Navbar,
    // Footer,
    Burger,
    useMantineTheme,
} from '@mantine/core';

const Layout = (props) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(true);
    const layoutComponentStyle = {
        background: theme.colorScheme === 'light' ? theme.colors.light[0] : theme.colors.night[0],
        borderRadius: "5px",
        transition: "all 0.2s",
    };

    // 視口達到某些寬度，navbar出現可
    // const { height, width } = useViewportSize();

    return (
        <AppShell
            styles={{
                root: {
                    background: theme.colorScheme === 'light' ? "#ebebeb" : "#0b0c29"
                },
            }}
            navbarOffsetBreakpoint="sm"
            header={
                <Header height={{ base: 60 }} p="md" pb="sm"
                    style={layoutComponentStyle}>
                    <div className={classes.header}>
                        <Group>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={!opened}
                                    onClick={() => { setOpened((o) => !o); console.log(opened); }}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="sm"
                                />
                            </MediaQuery>
                            <Search size={25} color={theme.colorScheme === 'dark' ? "white" : ""} />
                        </Group>
                        <Group>
                            <LightDarkButton style={{ cursor: "pointer" }} />
                            <Bell style={{ cursor: "pointer" }} size={25} color={theme.colorScheme === 'dark' ? "white" : ""} />
                            <Avatar
                                size={28}
                                style={{ cursor: "pointer", }}
                                src="https://t4.ftcdn.net/jpg/01/80/45/59/360_F_180455965_hTcjQ6257nkPtH2CTiLnUtUyjR820NsY.jpg" alt="it's me" />
                        </Group>
                    </div>
                </Header>
            }
            navbar={
                <Navbar
                    className={classes.nav}
                    style={layoutComponentStyle}
                    p="md" hiddenBreakpoint="sm" hidden={opened} width={{ base: 200, xl: 300 }} height='100vh'>
                    <SimpleGrid cols={1}>
                        <Navbar.Section>
                            <div style={{ position: "relative" }}>
                                <a href="javascript;" className={classes["nav-logo"]}>Mood</a>
                            </div>
                        </Navbar.Section>
                        <Navbar.Section>
                            <Button variant='subtle' fullWidth leftIcon={<HouseDoor className={classes["nav-icon"]} />}>
                                Assets/Hosts
                            </Button>
                        </Navbar.Section>
                        <Navbar.Section>
                            <Button variant='subtle' fullWidth leftIcon={<Gear className={classes["nav-icon"]} />} >
                                Assets/Hosts
                            </Button>
                        </Navbar.Section>
                    </SimpleGrid>
                </Navbar>
            }

        // footer={
        //     <Footer height={50} p="md" style={layoutComponentStyle}>
        //         Application footer
        //     </Footer>
        // }
        >
            <div >
                {props.children}
            </div>
        </AppShell>
    );
};

export default Layout;