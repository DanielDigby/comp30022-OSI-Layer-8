import React from "react";
import styles from "./HomeView.module.css";
import logo from "../../images/cara.svg";

import { useHistory } from "react-router-dom";

// Semantic UI button
import { Button } from "semantic-ui-react";

const HomeView = (): JSX.Element => {
    const loginHistory = useHistory();
    const navigateLogin = () => loginHistory.push("/login");
    const registerHistory = useHistory();
    const navigateRegister = () => registerHistory.push("/register");

    // api call
    return (
        <div className={styles.container}>
            <div className="image">
                <img className={styles.image} src={logo} />
            </div>

            <h1 className={styles.heading}>Cara</h1>
            <h4 className={styles.heading2}>Untangle your personal life</h4>

            <div className={styles.button}>
                <Button
                    className={styles.button}
                    basic
                    colour="black"
                    content="Sign-In"
                    onClick={() => navigateLogin()}
                />
                <Button
                    basic
                    colour="black"
                    content="Register"
                    onClick={() => navigateRegister()}
                />
            </div>
        </div>
    );
};

export default HomeView;
