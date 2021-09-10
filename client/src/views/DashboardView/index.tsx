import React from "react";
import styles from "./DashboardView.module.css";
import { useHistory } from "react-router-dom";

// Semantic UI button
import { Button } from "semantic-ui-react";

const DashboardView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateHome = () => navHistory.push("/");
    const navigateSettings = () => navHistory.push("/settings");
    const navigateNotes = () => navHistory.push("/notes");
    // api call
    return (
        <div>
            <div className={styles.container}>hello world dashboardview</div>

            <div className={styles.footer}>
                <Button size="medium" onClick={() => navigateHome()}>
                    Go Back
                </Button>
            </div>

            <div className={styles.footer}>
                <Button size="medium" onClick={() => navigateSettings()}>
                    temp settings button
                </Button>
            </div>

            <div className={styles.footer}>
                <Button size="medium" onClick={() => navigateNotes()}>
                    go to notes
                </Button>
            </div>
        </div>
    );
};

export default DashboardView;
