import React, { useEffect } from "react";
import styles from "./DashboardView.module.css";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import ProfileImage from "../NotesView/ProfileImage";
import { store } from "../../config/redux/store";

import { filterNotes, FilterOn } from "../../helpers/utils/filter";
import { INote } from "../../interfaces/note";

const DashboardView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");
    const navigateNotes = () => history.push("/notes");

    // Boot user out if not logged in
    useEffect(() => {
        if (!store.getState().user.account) history.push("/login");
    });

    /* get the First name of User */
    const firstName = store.getState().user.firstName;

    /* store.getState the arrays of notes */
    const allNotes = store.getState().notes.array;
    const eventNotes = filterNotes(allNotes, FilterOn.EVENT_TIME);
    if (eventNotes.length > 3) {
        eventNotes.slice(0, 4);
    }

    /* Filter the Pinned Notes, up to 4 */
    const pinnedNotes = filterNotes(allNotes, FilterOn.PINNED);
    if (pinnedNotes.length > 4) {
        pinnedNotes.slice(0, 5);
    }

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
                        <h1>{firstName}</h1>
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
                <div className={styles.eventsContainer}>
                    {eventNotes.map(function (content, idx) {
                        return <li key={idx}>{content._id}</li>;
                    })}
                </div>

                <div className={styles.tumbtackContainer}>
                    <Icon name="thumbtack" size="big" />
                </div>
                <div className={styles.pinnedContainer}></div>
            </div>
        </div>
    );
};

export default DashboardView;
