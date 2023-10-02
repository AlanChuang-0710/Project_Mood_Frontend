import React from 'react';
import { useState } from 'react';
import { Button, SimpleGrid, Grid, } from '@mantine/core';
import classes from "./layout.module.scss";
import { HouseDoor, Gear, Bell } from "react-bootstrap-icons";
import LightDarkButton from "../components/LightDarkButton";

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


    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200 }} height='100vh'>
                    <SimpleGrid cols={1}>
                        <Navbar.Section>
                            <a href="javascript;" className={classes["nav-logo"]}>Mood</a>
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
            <Grid>
                <Grid.Col span={12}>
                    <LightDarkButton />
                    <Bell size={25} color={theme.colorScheme === 'dark' ? "white" : ""} />
                </Grid.Col>
            </Grid>
            <div >
                {props.children}
            </div>
        </AppShell>
    );
};

export default Layout;