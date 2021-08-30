import React, { useState } from "react";
import styles from "./LogInView.module.css";
import logo from "../../images/cara.svg";
import { Link } from "react-router-dom";

// Semantic UI button
import { Button, Menu, Segment } from "semantic-ui-react";

const LogInView = (): JSX.Element => {
    // api call
    return (
        <div className={styles.container}>
            <div className={styles.header}>Login Page</div>

            <div className={styles.container}>
                <div className="image">
                    <Link to="/">
                    <img className={styles.image} src={logo} />
                    </Link>
                </div>

                <div className={styles.container}>
                    <h1 className={styles.heading}>Cara</h1>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input className={styles.input} type="email" placeholder="enter email"></input>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input className={styles.input} type="password" placeholder="password"></input>
                </div>
            </div>

            <div className={styles.footer}>
                <Button positive>Log in</Button>
            </div>

            <div className={styles.footer}>
                <Link to="/">
                    <Button size='medium'>Go Back</Button>
                </Link>
            </div>


        </div>
    );
};

export default LogInView;