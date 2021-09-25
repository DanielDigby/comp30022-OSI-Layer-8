import React from "react";
import styles from "./DashboardView.module.css";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import ProfileImage from "../NotesView/ProfileImage";

const DashboardView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");
    const navigateNotes = () => history.push("/notes");

    return (
        <div className={styles.basecontainer}>
            <div className={styles.topcontainer}>
                <ProfileImage
                    firstName="Sonja"
                    lastName="Pedell"
                    onClick={navigateDashboard}
                />
            </div>

            <div className={styles.midContainer}>
                <div className={styles.greetingsContainer}>
                    <div className={styles.heading}>
                        <h1>Good Morning,</h1>
                        <h1>Sonja.</h1>
                    </div>

                    <div className={styles.date}>
                        <label className={styles.label}>
                            16 September 2021
                        </label>
                    </div>
                </div>
                <div className={styles.viewNotesContainer}>
                    <Icon
                        name="sticky note outline"
                        size="big"
                        onClick={navigateNotes}
                    />
                    <div className={styles.viewAllNotesContainer}>
                        View <p>all notes</p>
                    </div>
                </div>
            </div>

            <div className={styles.bottomContainer}>
                <div className={styles.calendarContainer}>
                    <Icon name="calendar alternate" size="big" />
                </div>
                <div className={styles.tumbtackContainer}>
                    <Icon name="thumbtack" size="big" />
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
