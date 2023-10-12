import React, { useState, useCallback } from 'react';
import classes from "./LoginPage.module.scss";
import dayBg from "../../assets/loginSignup/day_bg.svg";
import nightBg from "../../assets/loginSignup/night_bg.svg";
import facebookIcon from "../../assets/loginSignup/facebook.svg";
import googleIcon from "../../assets/loginSignup/google.svg";
import { PasswordInput, TextInput, Button, useMantineTheme } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';

const LoginPage = () => {

    // 獲得當地時間判斷是否 day or night background
    const time = new Date().getHours();
    const theme = useMantineTheme();
    const [visible, { toggle }] = useDisclosure(false);


    // 統一控管提交資料
    const form = useForm({
        initialValues: {
            email: 'Alan@gmail.com',
            password: "Alan",
        },

        validate: {
            email: (value) => (/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length > 0 ? null : "Invalid password"
        },
    });

    // login
    const loginHandler = useCallback(
        () => {
            form.validate();
            if (form.isValid()) {
                nav("/");
            }
        },
        [form],
    );


    // 獲得跳轉
    const nav = useNavigate();

    return (
        <div className={classes.bg} style={{ backgroundImage: `url(${time > 17 ? nightBg : dayBg}) ` }}>
            <div className={classes.mask}>
                <div className={classes.wrapper}>
                    <div className={classes.email}>
                        <TextInput placeholder="youremail@email.com" label="Email" withAsterisk
                            {...form.getInputProps('email')} />
                    </div>
                    <div className={classes.password}>
                        <PasswordInput
                            label="Password"
                            withAsterisk
                            visible={visible}
                            onVisibilityChange={toggle}
                            {...form.getInputProps('password')}
                        />
                    </div>
                    <div className={classes.btn}>
                        <Button variant="filled" styles={{ root: { width: "100%" } }} onClick={loginHandler}>
                            Log in
                        </Button>
                    </div>
                    <div className={classes.signup}>
                        <p>Don't have an account? <span onClick={() => nav("/signup/create")} >Sign up</span> </p>
                    </div>
                    <div className={classes["login-option"]}>
                        <span>Or login with</span>
                    </div>
                    <div className={classes["social-media-logos"]}>
                        <div className={classes["logos-container"]}>
                            <a target="_blank" rel="noreferrer" href='https://zh-tw.facebook.com/'><img draggable={false} src={facebookIcon} alt="facebook icon" /></a>
                            <a target="_blank" rel="noreferrer" href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com.tw%2F%3Fhl%3Dzh_TW&ec=GAZAmgQ&hl=zh-TW&ifkv=AXo7B7Vxhi4xaUeX9Yb5AqM60qWiIjBlBSDaRcVf9JsctGMTZvwOM5rDQ82HRb4imdEyUzfJBbqO&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S621304842%3A1691114204120574">
                                <img draggable={false} src={googleIcon} alt="google icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LoginPage;