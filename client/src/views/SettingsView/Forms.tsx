import React, { useState } from "react";
import styles from "./Forms.module.css";

import { Icon } from "semantic-ui-react";

const FirstNameForm = (): JSX.Element => {
    const firstNameStateVariable = useState("first name");
    const firstName = firstNameStateVariable[0];
    const lastNameStateVariable = useState("last name");
    const lastName = lastNameStateVariable[0];
    const emailStateVariable = useState("email");
    const email = emailStateVariable[0];
    const password = "*********";

    return (
        <div>
            <div className={styles.formheading}>
                <div className={styles.formtitle}>
                    <div className={styles.field}>
                        {firstName}
                        <Icon
                            size="small"
                            name="pencil alternate"
                            color="grey"
                        />{" "}
                    </div>
                    <div className={styles.field}>
                        {lastName}
                        <Icon
                            size="small"
                            name="pencil alternate"
                            color="grey"
                        />
                    </div>
                    <div className={styles.field}>
                        {email}
                        <Icon
                            size="small"
                            name="pencil alternate"
                            color="grey"
                        />
                    </div>
                    <div className={styles.field}>
                        {password}
                        <Icon
                            size="small"
                            name="pencil alternate"
                            color="grey"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstNameForm;
