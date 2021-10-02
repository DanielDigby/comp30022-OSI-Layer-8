import React from "react";
import styles from "./LogInView.module.css";
import logo from "../../images/cara.svg";
import { useHistory } from "react-router-dom";

// Semantic UI button
import { Checkbox, Button } from "semantic-ui-react";

import { logInAPI } from "../../helpers/api/users";

const LogInView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateHome = () => navHistory.push("/");
    const navigateDashboard = () => navHistory.push("/dashboard");

    // Components to send over to our api call 
    

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
                        value=this.state.email
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
