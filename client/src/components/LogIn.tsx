import React from "react";
import kiwi from "../images/kiwi.svg";
import styles from "./Styles.module.css";

function LogIn(): JSX.Element {
    return (
        <div className={styles.basecontainer}>
            <div className={styles.header}>Login Page</div>

            <div className="content">
                <div className="image">
                    <img className={styles.image} src={kiwi} />
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="email">
                        Email
                    </label>
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="email"
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

            <div className="footer">
                <button className="btn" type="button">
                    Login
                </button>
            </div>
        </div>
    );
}

export default LogIn;
