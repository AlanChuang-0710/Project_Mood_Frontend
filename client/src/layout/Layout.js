import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppShell, Navbar, useMantineTheme, Burger, Menu, Text } from '@mantine/core';
import { Button, SimpleGrid, Group, Header, MediaQuery, Avatar, NavLink } from '@mantine/core';
import { IconSettings, IconLogout, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';
import { HouseDoor, Gear, Bell, Search, GraphUp, Compass, BodyText, Award } from "react-bootstrap-icons";
import LightDarkButton from "../components/LightDarkButton/LightDarkButton";
import { selectCurrentAccessToken, logout } from "../store/reducer/authSlice";
import { useGetComponentStyle, useGetLayoutComponentStyle } from "../styles/dayNightStyle";
import classes from "./layout.module.scss";

const Layout = (props) => {
    /* 路由權限 */
    // 透過selector抓取accessToken
    const accessToken = useSelector(selectCurrentAccessToken);
    const location = useLocation();
    const nav = useNavigate();

    /* 路由守衛 避免沒有token直接進入保護的頁面 */
    useEffect(() => {
        if (!accessToken) {
            nav("/login", { replace: true, state: { from: location } });
        };
    });

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(true);

    // navbar 選項
    const [active, setActive] = useState(("/" + location.pathname.split("/")[1]) === "/" ? "/dashboard" : "/" + location.pathname.split("/")[1]);
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
            label: 'Word Analysis',
            icon: <BodyText className={classes["nav-icon"]} />,
            route: "/word-analysis"
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
        {
            label: 'Administrator',
            icon: <Award className={classes["nav-icon"]} />,
            route: "/administrator"
        },
    ];

    const navClickHandler = useCallback((route) => {
        setActive(route);
        nav(route);
    }, [nav, setActive]);

    // logout 選項
    const dispatch = useDispatch();
    const logoutHandler = useCallback(() => {
        dispatch(logout());
        nav("/login");
    }, [dispatch, nav]);

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
                                    onClick={() => { setOpened((o) => !o); }}
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
                            <Menu shadow="md" width={200} position='bottom-end' trigger="hover" openDelay={100} closeDelay={400}>
                                <Menu.Target>
                                    <Button size="25" variant="default" style={{ border: "none" }}>
                                        <Avatar
                                            size={30}
                                            style={{ cursor: "pointer", borderRadius: "50%" }}
                                            src="https://t4.ftcdn.net/jpg/01/80/45/59/360_F_180455965_hTcjQ6257nkPtH2CTiLnUtUyjR820NsY.jpg" alt="it's me" />
                                    </Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>Application</Menu.Label>
                                    <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                                    <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                                    <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                                    <Menu.Item
                                        onClick={logoutHandler}
                                        icon={<IconLogout size={14} />}
                                        rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                                    >
                                        Logout
                                    </Menu.Item>

                                    <Menu.Divider />

                                    <Menu.Label>Danger zone</Menu.Label>
                                    <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
                                    <Menu.Item color="red" icon={<IconTrash size={14} />}>Delete my account</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
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
                                    <a href="google.com" className={classes["nav-logo"]} onClick={(e) => e.preventDefault()}>Mood</a>
                                </div>
                            </Navbar.Section>

                            {navButtons.map((option, index) => <NavLink
                                styles={{ root: { '&:hover': { backgroundColor: theme.colorScheme === 'light' ? theme.colors.button[0] : theme.colors.button[1], borderRadius: "8px" }, '&[data-active]': { backgroundColor: theme.colorScheme === 'light' ? theme.colors.button[0] : theme.colors.button[1], borderRadius: "8px" } }, inner: { justifyContent: "flex-start", marginLeft: "5px", color: theme.colors.tool[0], fontSize: "16px" } }}
                                key={index}
                                active={option.route === active}
                                label={option.label}
                                icon={option.icon}
                                onClick={() => navClickHandler(option.route)}
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
                <Suspense fallback={<>Loading...</>}>
                    <Outlet />
                </Suspense>
            </div>
        </AppShell>
    );
};

export default Layout;