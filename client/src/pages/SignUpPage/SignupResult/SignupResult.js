import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mantine/core";
import { signupSuccess } from "@/assets/index.js";
import classes from "./SignupResult.module.scss";


const SignupResult = () => {
    const nav = useNavigate();
    return (
        <div className={classes.success}>
            <div className={classes["success-icon"]}>
                <img src={signupSuccess} alt="Phone Icon" style={{ width: "45%" }} />
            </div>
            <div className={classes.title}>
                <div>Congrats! <br />Successfully Register</div>
            </div>
            <div className={classes.btn}>
                <Button onClick={() => nav("/login")} variant="filled" styles={{ root: { width: "100%" } }} >
                    Back to Login
                </Button>
            </div>
        </div>
    );
};

export default SignupResult;