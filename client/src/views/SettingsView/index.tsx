import React from "react";
import styles from "./SettingsView.module.css";

import { useHistory } from "react-router-dom";
// Semantic UI button
import { Button } from "semantic-ui-react";

const SettingsView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateDashboard = () => navHistory.push("/dashboard");

    // api call
    return (
        <div>
            <div className={styles.container}>hello world settingsview</div>
            <div className={styles.footer}>
                <Button positive onClick={() => navigateDashboard()}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default SettingsView;
