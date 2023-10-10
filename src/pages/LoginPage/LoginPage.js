import React, { useState } from 'react';
import classes from "./LoginPage.module.scss";
import dayBg from "../../assets/login_signup_background/day_bg.svg";
import nightBg from "../../assets/login_signup_background/night_bg.svg";
import facebookIcon from "../../assets/facebook.svg";
import googleIcon from "../../assets/google.svg";
import { PasswordInput, TextInput, Button, useMantineTheme } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

const LoginPage = () => {

    // 獲得當地時間判斷是否 day or night background
    const time = new Date().getHours();
    const theme = useMantineTheme();

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [visible, { toggle }] = useDisclosure(false);

    return (
        <div className={classes.bg} style={{ backgroundImage: `url(${time > 17 ? dayBg : nightBg}) ` }}>
            <div className={classes["login-signup-wrapper"]}>
                <div className={classes.login}>
                    <div className={classes.email}>
                        <TextInput placeholder="youremail@email.com" label="Email" withAsterisk
                            value={emailValue} onChange={(event) => setEmailValue(event.currentTarget.value)} />
                    </div>
                    <div className={classes.password}>
                        <PasswordInput
                            label="Password"
                            withAsterisk
                            visible={visible}
                            onVisibilityChange={toggle}
                            value={passwordValue} onChange={(event) => setPasswordValue(event.currentTarget.value)}
                        />
                    </div>
                    <div className={classes.btn}>
                        <Button variant="filled" styles={{ root: { width: "100%" } }}>
                            Log in
                        </Button>
                    </div>
                    <div className={classes.signup}>
                        <p>Don't have an account? <span >Sign up</span> </p>
                    </div>
                    <div className={classes["login-option"]}>
                        <span>Or login with</span>
                    </div>
                    <div className={classes["social-media-logos"]}>
                        <div className={classes["logos-container"]}>
                            <a target="_blank" href='https://zh-tw.facebook.com/'><img draggable={false} src={facebookIcon} alt="facebook icon" /></a>
                            <a target="_blank" href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com.tw%2F%3Fhl%3Dzh_TW&ec=GAZAmgQ&hl=zh-TW&ifkv=AXo7B7Vxhi4xaUeX9Yb5AqM60qWiIjBlBSDaRcVf9JsctGMTZvwOM5rDQ82HRb4imdEyUzfJBbqO&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S621304842%3A1691114204120574">
                                <img draggable={false} src={googleIcon} alt="google icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;