import React, { useState } from "react";
import styles from "./LogInView.module.css";
import logo from "../../assets/logo.png";
import { Input } from "semantic-ui-react";
import { Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { logInAPI, logOutAPI, Credentials } from "../../helpers/api/users";

const LogInView = (): JSX.Element => {
    const history = useHistory();

    const [email, setEmail] = useState<Credentials["email"]>("");
    const [password, setPassword] = useState<Credentials["password"]>("");

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        const submittedPassword = password;
        setPassword("");
        try {
            await logInAPI({ email: email, password: submittedPassword });
            const allowCookies = confirm(
                "We use cookies to personalise content in cara.\n\n" +
                    "Accept and continue?"
            );
            if (allowCookies) {
                history.push("/dashboard");
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
                    <div className={styles.inputTitle}>Email </div>
                    <Form.Field>
                        <Input
                            fluid
                            placeholder="name@email.com"
                            value={email}
                            onChange={handleEmail}
                        />
                    </Form.Field>
                    <div className={styles.inputTitle}>Password</div>
                    <Form.Field>
                        <Input
                            fluid
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </Form.Field>
                    <div className={styles.buttons}>
                        <Button
                            content="Sign in"
                            color="orange"
                            type="submit"
                        />

                        <Button
                            content="Sign up"
                            color="black"
                            onClick={() => history.push("/register")}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default LogInView;
