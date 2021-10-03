import React, { DOMElement, useState } from "react";
import styles from "./LogInView.module.css";
import logo from "../../images/cara.svg";
import { useHistory } from "react-router-dom";

// Semantic UI button
import { Checkbox, Button } from "semantic-ui-react";

import { logInAPI, Credentials } from "../../helpers/api/users";
import { setCacheNameDetails } from "workbox-core";

const validateUserLogIn = (creds: Credentials) => {
    const res = logInAPI(creds);

    if (!res) {
        navigateDashboard();
    } else {
        console.log("Login error\n");
    }
};

const LogInView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateHome = () => navHistory.push("/");
    const navigateDashboard = () => navHistory.push("/dashboard");

    // Components to send over to our api call
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Functions to update email and password entered
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        console.log(email);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        console.log(password);
    };

    // api call
    return (
        <div className={styles.basecontainer}>
            <div className={styles.header}>Login Page</div>

            <div className={styles.container}>
                <div className="image">
                    <img
                        className={styles.image}
                        src={logo}
                        onClick={() => navigateHome()}
                    />
                </div>

                <div className={styles.heading}>
                    <h1>Cara</h1>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="email">
                        Email
                    </label>
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="enter email"
                        onChange={handleEmail}
                    ></input>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="password"
                        onChange={handlePassword}
                    ></input>
                </div>
            </div>

            {/* Centered right now*/}
            <div className={styles.rememberMe}>
                <Checkbox label="Remember me" />
            </div>

            <div className={styles.footer}>
                <Button positive onClick={() => navigateDashboard()}>
                    Log in
                </Button>
            </div>

            <div className={styles.footer}>
                <Button size="medium" onClick={() => navigateHome()}>
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default LogInView;
