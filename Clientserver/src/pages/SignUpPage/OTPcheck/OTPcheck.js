import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PinInput, Button } from "@mantine/core";
import { useForm } from '@mantine/form';
import { loginByPhone } from "@/assets/index.js";
import classes from "./OTP.module.scss";

const OTPcheck = () => {

  // 獲得跳轉
  const nav = useNavigate();

  const form = useForm({
    initialValues: {
      pin: '',
    },
    validate: {
      pin: (value) => value.length === 4 ? null : "Invalid pin"
    }
  });

  const sendOTPHandler = useCallback(() => {
    form.validate();
    if (form.isValid()) {
      nav("/signup/result");
    }
  }, [nav, form]);


  return (
    <div className={classes.otp}>
      <div className={classes["phone-icon"]}>
        <img src={loginByPhone} alt="Phone Icon" style={{ width: "50%" }} />
      </div>
      <div className={classes.title}>
        <div>Enter your phone number</div>
      </div>
      <div className={classes.reminder}>
        Enter the OTP code sent to 09XXXXXXXXXX
      </div>
      <div className={classes["pin-input"]}>
        <PinInput  {...form.getInputProps('pin')} type="number" oneTimeCode styles={{ root: { justifyContent: "center" } }} />
      </div>
      <div className={classes.btn}>
        <Button onClick={sendOTPHandler} variant="filled" styles={{ root: { width: "100%" } }} >
          Send OTP
        </Button>
      </div>
    </div>
  );
};

export default OTPcheck;