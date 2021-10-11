import React from "react";
import { Icon } from "semantic-ui-react";
import styles from "./InstallPrompt.module.css";

export const InstallPrompt = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <Icon name="download" />
            <div>
                Cara can be installed on mobile devices by tapping on your
                browser options, then selecting <b>Add to Home screen</b>
            </div>
        </div>
    );
};
