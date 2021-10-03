import React, { useState } from "react";
import styles from "./RegisterView.module.css";
import logo from "../../images/cara.svg";
import { useHistory } from "react-router-dom";

// Semantic UI button
import { Button } from "semantic-ui-react";
import { INewUser } from "../../interfaces/user";
import { registerAPI } from "../../helpers/api/users";
//import internal from "stream";

const RegisterView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateHome = () => navHistory.push("/");
    const navigateLogin = () => navHistory.push("/login");

    // Variables to hold our register form inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    // Handlers to update state when form is filled out
    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword1(e.target.value);
    };

    const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword2(e.target.value);
    };

    const submitRegistration = async () => {
        const user: INewUser = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password1: password1,
            password2: password2,
            profilePic: null,
        };

        try {
            await registerAPI(user);
            navigateLogin();
        } catch (error: any) {
            console.log(error.stack);
            return;
        }
    };

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
                    <label className={styles.label} htmlFor="firstname">
                        First name
                    </label>
                    <input
                        className={styles.input}
                        type="name"
                        placeholder="First name"
                        onChange={handleFirstName}
                    ></input>
                </div>

                <div className={styles.form}>
                    <label className={styles.label} htmlFor="lastname">
                        Last name
                    </label>
                    <input
                        className={styles.input}
                        type="name"
                        placeholder="Last name"
                        onChange={handleLastName}
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
                        onChange={handleEmail}
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
                        onChange={handlePassword1}
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
                        onChange={handlePassword2}
                    ></input>
                </div>
            </div>

            <div className={styles.footer}>
                <Button onClick={() => submitRegistration()} positive>
                    Register
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

export default RegisterView;
