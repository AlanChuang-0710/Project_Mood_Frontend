import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { TextInput, Button } from "@mantine/core";
import { loginByPhone } from "../../../assets/index.js";
import classes from "./Verification.module.scss";

const Verification = () => {

    // 獲得跳轉
    const nav = useNavigate();

    // 統一數據管理
    const form = useForm({
        initialValues: {
            phone: "0975684593"
        },
        validate: {
            phone: (value) => /^09\d{2}-?\d{3}-?\d{3}$/.test(value) ? null : "Invalid phone"
        }
    });

    const verificationHandler = useCallback(
        () => {
            form.validate();
            if (form.isValid()) {
                nav("/signup/otp");
            }
        },
        [form, nav],
    );


    return (
        <div className={classes.verification}>
            <div className={classes["phone-icon"]}>
                <img src={loginByPhone} alt="Phone Icon" style={{ width: "50%" }} />
            </div>
            <div className={classes.title}>
                <div>Enter your phone number</div>
            </div>
            <div className={classes.reminder}>
                We will send you the 4 digit verification code
            </div>
            <div className={classes.phone}>
                <TextInput
                    withAsterisk
                    label="Phone"
                    placeholder="09XXXXXXXX"
                    {...form.getInputProps('phone')}
                />
            </div>
            <div className={classes.btn}>
                <Button variant="filled" styles={{ root: { width: "100%" } }} onClick={verificationHandler}>
                    Send OTP
                </Button>
            </div>
        </div>
    );
};

export default Verification;