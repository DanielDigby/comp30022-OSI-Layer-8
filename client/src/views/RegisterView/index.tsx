import React, { useState } from "react";
import styles from "./RegisterView.module.css";
import logo from "../../images/cara.svg";
import { Link } from "react-router-dom";

// Semantic UI button
import { Button, Menu } from "semantic-ui-react";


const RegisterView = (): JSX.Element => {
    // api call
    return (
        <div className={styles.basecontainer}>
            <div className={styles.header}>Registration Page</div>

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
                    <label className={styles.label} htmlFor="email">Full name</label>
                    <input className={styles.input} type="name" placeholder="enter full name"></input>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="email">Enter Email</label>
                    <input className={styles.input} type="email" placeholder="enter email"></input>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="password">Enter Password</label>
                    <input className={styles.input} type="password" placeholder="password"></input>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="password">Enter Password again</label>
                    <input className={styles.input} type="password" placeholder="password"></input>
                </div>

            </div>


            <div className={styles.footer}>
                <Button positive>Register</Button>
            </div>


            <div className="footer">
                <Link to="/">
                    <Button size='medium'>Go Back</Button>
                </Link>
            </div>

        </div>
    );
};

export default RegisterView;