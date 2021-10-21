import React, { useState } from "react";
import styles from "./RegisterView.module.css";
import { useHistory } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import logo from "../../assets/logo.png";
import { INewUser } from "../../interfaces/user";
import { registerAPI, logOutAPI } from "../../helpers/api/users";
//import internal from "stream";

const RegisterView = (): JSX.Element => {
    const history = useHistory();

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

    const handleSubmit = async () => {
        const user: INewUser = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password1: password1,
            password2: password2,
            profilePic: null,
        };

        setPassword1("");
        setPassword2("");
        try {
            await registerAPI(user);
            const allowCookies = confirm(
                "We use cookies to personalise content in cara.\n\n" +
                    "Accept and continue?"
            );
            if (allowCookies) {
                history.push("/");
            } else {
                logOutAPI(history);
            }
        } catch (error: unknown) {
            console.log(error);
            return;
        }
    };

    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="logo" />
            <div className={styles.title}>cara</div>
            <div className={styles.subtitle}>Untangle your personal life</div>
            <div className={styles.inputSection}>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Email</label>
                        <Input
                            id="input-email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmail}
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>First Name</label>
                            <Input
                                id="input-first-name"
                                placeholder="First Name"
                                value={firstName}
                                onChange={handleFirstName}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Last Name</label>
                            <Input
                                id="input-last-name"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={handleLastName}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Password</label>
                            <Input
                                id="input-password-1"
                                placeholder="Password"
                                type="password"
                                value={password1}
                                onChange={handlePassword1}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm</label>
                            <Input
                                id="input-password-2"
                                placeholder="Password"
                                type="password"
                                value={password2}
                                onChange={handlePassword2}
                            />
                        </Form.Field>
                    </Form.Group>

                    <div className={styles.buttons}>
                        <Button
                            id="submit"
                            content="Sign Up"
                            color="orange"
                            type="submit"
                        />
                        <Button
                            content="Back"
                            color="black"
                            onClick={() => history.goBack()}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default RegisterView;
