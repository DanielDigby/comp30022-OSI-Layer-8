import React, { useState } from "react";
import styles from "./FirstNameForm.module.css";

import { Icon } from "semantic-ui-react";

const FirstNameForm = (): JSX.Element => {
    const firstNameStateVariable = useState("first name");
    const firstName = firstNameStateVariable[0];
    const setName = firstNameStateVariable[1];
    const lastNameStateVariable = useState("last name");
    const lastName = lastNameStateVariable[0];
    const setLastName = lastNameStateVariable[1];
    const emailStateVariable = useState("email");
    const email = emailStateVariable[0];
    const setEmail = emailStateVariable[1];

    {
        /* setName according to form update later */
    }

    return (
        <div>
            <div className={styles.formheading}>
                <div className={styles.formtitle}>
                    <h4 className={styles.formtitletext}>First name</h4>
                    <Icon size="small" name="edit outline" />
                </div>
                <h4 className={styles.formfield}>{firstName}</h4>
            </div>
            <div className={styles.formheading}>
                <div className={styles.formtitle}>
                    <h4 className={styles.formtitletext}>Last name</h4>
                    <Icon size="small" name="edit outline" />
                </div>
                <h4 className={styles.formfield}>{firstName}</h4>
            </div>
            <div className={styles.formheading}>
                <div className={styles.formtitle}>
                    <h4 className={styles.formtitletext}>Email</h4>
                    <Icon size="small" name="edit outline" />
                </div>
                <h4 className={styles.formfield}>{firstName}</h4>
            </div>
        </div>
    );
};

export default FirstNameForm;