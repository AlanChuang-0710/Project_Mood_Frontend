import React, { useCallback } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button } from "@mantine/core";
import loginByPhone from "../../../assets/loginSignup/login_by_phone.svg";
import classes from "./Verification.module.scss";

const Verification = () => {
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
                alert("Verified");
            }
        },
        [form],
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