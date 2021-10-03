import React, { useEffect } from "react";
import styles from "./DashboardView.module.css";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import ProfileImage from "../NotesView/ProfileImage";
import { store } from "../../config/redux/store";

//import { filterNotes, FilterOn } from "../../helpers/utils/filter";
//import { INote } from "../../interfaces/note";

/*
const testNotes = [
    {
        _id: "a",
        _clientId: "djfhjaskjdfa",
        title: null,
        text: null,
        image: null,
        reminderTime: null,
        eventTime: null,
        pinned: true,
        tags: [],
        relatedNotes: [],
    },
];*/

const DashboardView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");
    const navigateNotes = () => history.push("/notes");

    // Boot user out if not logged in
    useEffect(() => {
        if (!store.getState().user.account) history.push("/login");
    });

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
                <div className={styles.eventsContainer}></div>
                <div className={styles.tumbtackContainer}>
                    <Icon name="thumbtack" size="big" />
                </div>
                <div className={styles.pinnedContainer}></div>
            </div>
        </div>
    );
};

export default DashboardView;
