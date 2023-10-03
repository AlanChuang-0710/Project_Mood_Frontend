import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, SimpleGrid, Group, } from '@mantine/core';
import classes from "./layout.module.scss";
import { HouseDoor, Gear, Bell, Search, XLg } from "react-bootstrap-icons";
import LightDarkButton from "../components/LightDarkButton";
import { useViewportSize } from '@mantine/hooks';

import {
    AppShell,
    Navbar,
    Footer,
    MediaQuery,
    Burger,
    useMantineTheme,
} from '@mantine/core';

const Layout = (props) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    // 視口達到某些寬度，navbar出現可
    const { height, width } = useViewportSize();

    const appShellStyle = {
        body: {
            background: "#dbdbeb"
        }
    };

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            navbar={
                <Navbar
                    className={classes.nav}
                    style={{ background: theme.colorScheme === 'dark' ? "#2b2c40" : theme.colors.gray[0] }}
                    p="md" hidden={!opened} hiddenBreakpoint="sm" width={{ base: 200, xl: 300 }} height='100vh'>
                    <SimpleGrid cols={1}>
                        <Navbar.Section>
                            <div style={{ position: "relative" }}>
                                {width < 768 && <XLg onClick={() => setOpened(false)} className={classes["nav-close"]}></XLg>}
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

            footer={
                <Footer height={50} p="md">
                    Application footer
                </Footer>
            }
        >
            <div className={classes.header}>
                <Group>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                            opened={opened}
                            onClick={() => setOpened((o) => !o)}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr="sm"
                        />
                    </MediaQuery>
                    <Search size={25} color={theme.colorScheme === 'dark' ? "white" : ""} />
                </Group>
                <Group>
                    <LightDarkButton />
                    <Bell size={25} color={theme.colorScheme === 'dark' ? "white" : ""} />
                </Group>
            </div>
            <div >
                {props.children}
            </div>
        </AppShell>
    );
};

export default Layout;