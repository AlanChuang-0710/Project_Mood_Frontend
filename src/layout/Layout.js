import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { Button, SimpleGrid, Group, Header, MediaQuery, Avatar, NavLink } from '@mantine/core';
import classes from "./layout.module.scss";
import { HouseDoor, Gear, Bell, Search, GraphUp, Compass } from "react-bootstrap-icons";
import LightDarkButton from "../components/LightDarkButton/LightDarkButton";
import { useNavigate } from 'react-router-dom';
import { useGetComponentStyle, useGetLayoutComponentStyle } from "../styles/dayNightStyle";
import { AppShell, Navbar, useMantineTheme, Burger } from '@mantine/core';

const Layout = (props) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(true);

    // navbar 選項
    const [active, setActive] = useState(0);
    const navButtons = [
        {
            label: 'Dashboard',
            icon: <HouseDoor className={classes["nav-icon"]} />,
            route: "/dashboard"
        },
        {
            label: 'Analysis',
            icon: <GraphUp className={classes["nav-icon"]} />,
            route: "/analysis"
        },
        {
            label: 'Compass',
            icon: <Compass className={classes["nav-icon"]} />,
            route: "/compass"
        },
        {
            label: 'Account Settings',
            icon: <Gear className={classes["nav-icon"]} />,
            route: "/account"
        },
    ];

    /* 獲得nav */
    const nav = useNavigate();
    const navClickHandler = useCallback((index, route) => {
        setActive(index);
        nav(route);
    }, [nav]);

    return (
        <AppShell
            styles={{
                root: {
                    background: theme.colorScheme === 'light' ? "#ebebeb" : "#0b0c29"
                },
            }}
            navbarOffsetBreakpoint="sm"
            header={
                <Header height={{ base: 68 }} p="md" pb="sm"
                    style={useGetLayoutComponentStyle()}>
                    <div className={classes.header}
                        style={useGetComponentStyle()}>
                        <Group>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={!opened}
                                    onClick={() => { setOpened((o) => !o); console.log(opened); }}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                />
                            </MediaQuery>
                            <Button size="25" variant="default" style={{ border: "none" }}>
                                <Search size={23} style={{ cursor: "pointer" }} color={theme.colorScheme === 'light' ? theme.colors.tool[0] : "white"} />
                            </Button>
                        </Group>
                        <Group>
                            <LightDarkButton style={{ cursor: "pointer" }} />
                            <Button size="25" variant="default" style={{ border: "none" }}>
                                <Bell className={classes.bell} style={{ cursor: "pointer" }} size={25} color={theme.colorScheme === 'light' ? theme.colors.tool[0] : "white"} />
                            </Button>
                            <Button size="25" variant="default" style={{ border: "none" }}>
                                <Avatar
                                    size={30}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                    src="https://t4.ftcdn.net/jpg/01/80/45/59/360_F_180455965_hTcjQ6257nkPtH2CTiLnUtUyjR820NsY.jpg" alt="it's me" />
                            </Button>
                        </Group>
                    </div>
                </Header>
            }
            navbar={
                <Navbar
                    className={classes.nav}
                    style={useGetLayoutComponentStyle()}
                    p="md" hiddenBreakpoint="sm" hidden={opened} width={{ base: 230, xl: 300 }} height='100vh'>
                    <div className={classes.nav} style={useGetComponentStyle()}>
                        <SimpleGrid cols={1}>
                            <Navbar.Section>
                                <div style={{ position: "relative" }}>
                                    <a href="javascript;" className={classes["nav-logo"]}>Mood</a>
                                </div>
                            </Navbar.Section>

                            {navButtons.map((option, index) => <NavLink
                                styles={{ root: { '&:hover': { backgroundColor: theme.colorScheme === 'light' ? "" : "#33486B", borderRadius: "8px" }, '&[data-active]': { backgroundColor: theme.colorScheme === 'light' ? "" : "#33486B", borderRadius: "8px" } }, inner: { justifyContent: "flex-start", marginLeft: "5px", color: theme.colors.tool[0], fontSize: "16px" } }}
                                key={index}
                                active={index === active}
                                label={option.label}
                                icon={option.icon}
                                onClick={() => navClickHandler(index, option.route)}
                            />)}
                        </SimpleGrid>
                    </div>
                </Navbar>
            }

        // footer={
        //     <Footer height={50} p="md" style={useGetLayoutComponentStyle()}>
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