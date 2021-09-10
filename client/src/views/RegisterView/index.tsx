import React from "react";
import styles from "./RegisterView.module.css";
import logo from "../../images/cara.svg";
import { useHistory } from "react-router-dom";

// Semantic UI button
import { Button } from "semantic-ui-react";

const RegisterView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateHome = () => navHistory.push("/");

    // api call
    return (
        <div className={styles.basecontainer}>
            <div className={styles.header}>Registration Page</div>

            <div className={styles.container}>
                <div className="image">
                    <img
                        className={styles.image}
                        src={logo}
                        onClick={() => navigateHome()}
                    />
                </div>

                <div className={styles.container}>
                    <h1 className={styles.heading}>Cara</h1>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="email">
                        Full name
                    </label>
                    <input
                        className={styles.input}
                        type="name"
                        placeholder="enter full name"
                    ></input>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="email">
                        Enter Email
                    </label>
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="enter email"
                    ></input>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="password">
                        Enter Password
                    </label>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="password"
                    ></input>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="password">
                        Enter Password again
                    </label>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="password"
                    ></input>
                </div>
            </div>

            <div className={styles.footer}>
                <Button positive>Register</Button>
            </div>

            <div className={styles.footer}>
                <Button size="medium" onClick={() => navigateHome()}>
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default RegisterView;
