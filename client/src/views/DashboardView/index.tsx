import React from "react";
import styles from "./DashboardView.module.css";
import { useHistory } from "react-router-dom";

// trigger tests

import { Icon } from "semantic-ui-react";

const DashboardView = (): JSX.Element => {
    /*
    const navHistory = useHistory();
    const navigateHome = () => navHistory.push("/");
    const navigateSettings = () => navHistory.push("/settings");
    const navigateNotes = () => navHistory.push("/notes");
    */

    // api call

    return (
        <div className={styles.basecontainer}>
            <div className={styles.topcontainer}> profile pic </div>

            <div className={styles.viewNotesContainer}>
                <Icon name="sticky note outline" />
                <div className={styles.viewAllNotesContainer}>
                    View <p>all notes</p>
                </div>
            </div>
            <div className={styles.greetingsContainer}>
                <div className={styles.heading}>
                    <h1>Good Morning,</h1>
                    <h1>Sonja.</h1>
                </div>

                <div className={styles.date}>
                    <label className={styles.label} htmlFor="email">
                        16 September 2021
                    </label>
                </div>
            </div>
        </div>
    );
};

/*
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

*/

export default DashboardView;
