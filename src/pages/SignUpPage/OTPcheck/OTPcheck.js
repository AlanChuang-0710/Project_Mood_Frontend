import React from 'react';
import classes from "./OTP.module.scss";
import { PinInput, Button } from "@mantine/core";
import loginByPhone from "../../../assets/loginSignup/login_by_phone.svg";

const OTPcheck = () => {
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
        <PinInput oneTimeCode styles={{ root: { justifyContent: "center" } }} />
      </div>
      <div className={classes.btn}>
        <Button variant="filled" styles={{ root: { width: "100%" } }} >
          Send OTP
        </Button>
      </div>
    </div>
  );
};

export default OTPcheck;