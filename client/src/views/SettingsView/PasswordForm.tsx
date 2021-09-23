import React from "react";
import styles from "./PasswordForm.module.css";

import { Form, Button } from "semantic-ui-react";

const PasswordForm = (): JSX.Element => {
    {
        /* setName according to form update later */
    }

    return (
        <div className={styles.password}>
            <Form>
                <Form.Group>
                    <Form.Input
                        label="New Password"
                        placeholder="Password"
                        name="name"
                    />
                    <Form.Input
                        label="Confirm password"
                        placeholder="Password"
                        name="email"
                    />
                    <div className={styles.button}>
                        <Button content="Update" />
                    </div>
                </Form.Group>
            </Form>
        </div>
    );
};

export default PasswordForm;
