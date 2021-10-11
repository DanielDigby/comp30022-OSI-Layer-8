import React, { useState } from "react";
import styles from "./LogInView.module.css";
import logo from "../../images/cara.svg";
import { useHistory } from "react-router-dom";
import { logOutAPI } from "../../helpers/api/users";

// Semantic UI button
import { Checkbox, Button } from "semantic-ui-react";

import { logInAPI, Credentials } from "../../helpers/api/users";

const LogInView = (): JSX.Element => {
    const history = useHistory();
    const navigateHome = () => history.push("/");
    const navigateDashboard = () => history.push("/dashboard");

    // Components to send over to our api call
    const [email, setEmail] = useState<Credentials["email"]>("");
    const [password, setPassword] = useState<Credentials["password"]>("");

    // Functions to update email and password entered
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // api call

    const validateUserLogIn = async () => {
        try {
            await logInAPI({ email: email, password: password });
            setPassword("");
            const allowCookies = confirm(
                "We use cookies to personalise content in cara.\n\n" +
                    "Accept and continue?"
            );
            if (allowCookies) {
                navigateDashboard();
            } else {
                logOutAPI(history);
            }
        } catch (error: unknown) {
            console.log(error);
            return;
        }
    };

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
                <Button positive onClick={() => validateUserLogIn()}>
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
