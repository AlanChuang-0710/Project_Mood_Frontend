import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { PasswordInput, TextInput, Button, Checkbox, Tabs, LoadingOverlay } from "@mantine/core";
import { useForm } from '@mantine/form';
import Verification from "./Verification/Verification";
import OTPcheck from './OTPcheck/OTPcheck';
import SignupResult from "./SignupResult/SignupResult";
import { useRegisterMutation } from "../../store/api/authApi";
import { dayBg, nightBg } from "../../assets/index.js";
import classes from "./SignUpPage.module.scss";

const SignUpPage = () => {
    const nav = useNavigate();

    const { tabValue } = useParams();

    // 獲得當地時間判斷是否 day or night background
    const time = new Date().getHours();
    const [visible, { toggle }] = useDisclosure(false);

    // 統一控管提交資料
    const form = useForm({
        initialValues: {
            username: "Alan",
            email: 'Alan@gmail.com',
            password: "Alan",
            termsOfService: false,
        },

        validate: {
            username: (value) => value.length > 0 ? null : "Invalid username",
            email: (value) => (/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value.length > 0 ? null : "Invalid password",
            termsOfService: (value) => value ? null : " "
        },
    });

    // signup 
    const [register, { isLoading }] = useRegisterMutation();
    const signupHandler =
        async () => {
            form.validate();
            if (form.isValid()) {
                try {
                    const result = await register(form.values).unwrap(); //獲得原始的error，以利try catch攔截
                    if (result.code !== 4001) {
                        nav("/signup/verification");
                    } else {
                        // 展示後端回傳的msg
                        alert(result.msg);
                    }
                } catch (err) {
                    alert("No server response");
                }
            }
        };

    return (
        <div className={classes.bg} style={{ backgroundImage: `url(${time > 17 ? nightBg : dayBg}) ` }}>
            <div className={classes.mask}>
                <div className={classes.wrapper}>
                    {isLoading && <LoadingOverlay visible={true} zIndex={1000} styles={{ overlay: { radius: "sm", blur: 2 } }} />}
                    <Tabs value={tabValue} onChange={(value) => nav(`/signup/${tabValue}`)}>
                        <Tabs.Panel value="create">
                            <div className={classes.signup}>
                                <div className={classes.username}>
                                    <TextInput placeholder="Alan" label="Username" withAsterisk
                                        {...form.getInputProps('username')} />
                                </div>
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
                                    <Button variant="filled" styles={{ root: { width: "100%" } }} onClick={signupHandler}>
                                        Create Account
                                    </Button>
                                </div>
                                <div className={classes.checkbox}>
                                    <Checkbox styles={{ labelWrapper: { fontSize: "15px" } }} label="By creating an account you have to agree with our terms & conditions." {...form.getInputProps('termsOfService', { type: 'checkbox' })} />
                                </div>
                                <div className={classes.alter}>
                                    <p>Already have an account? <span onClick={() => nav("/login")} >Log in</span> </p>
                                </div>
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="verification">
                            <Verification />
                        </Tabs.Panel>
                        <Tabs.Panel value="otp">
                            <OTPcheck />
                        </Tabs.Panel>
                        <Tabs.Panel value="result">
                            <SignupResult />
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;