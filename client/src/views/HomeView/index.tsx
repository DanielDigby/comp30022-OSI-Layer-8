import React, { useState } from "react";
import styles from "./HomeView.module.css";
import logo from "../../images/cara.svg";

// Semantic UI button
import { Button, Menu } from "semantic-ui-react";

const HomeView = (): JSX.Element => {
    // api call
    return (
        <div className={styles.container}>
                <div className="image">
                    <img className={styles.image} src={logo} />
                </div>
                
                <h1 className={styles.heading}>Cara</h1>
                <h4 className={styles.heading2}>Untangle your personal life</h4>

            <div className={styles.button}>
                <Button className={styles.button} basic colour="black" content="Sign-Up" />
                <Button basic colour="black" content="Register" />
            </div>
        </div>




    );
};

export default HomeView;