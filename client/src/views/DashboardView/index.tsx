import React, { useEffect } from "react";
import styles from "./DashboardView.module.css";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import ProfileImage from "../NotesView/ProfileImage";
import { store } from "../../config/redux/store";

import { filterNotes, FilterOn } from "../../helpers/utils/filter";
import { INote } from "../../interfaces/note";
//import { filterNotes } from "../../helpers/utils/filter";

const nov = new Date();
nov.setFullYear(2021, 11, 20);
const oct = new Date();
oct.setFullYear(2021, 10, 31);
const dec = new Date();
dec.setFullYear(2021, 12, 10);

/*
const testEventNotes = [
    {
        _id: "event-november",
        _clientId: "djfhjaskjdfa",
        title: null,
        text: null,
        image: null,
        reminderTime: null,
        eventTime: nov,
        pinned: true,
        tags: [],
        relatedNotes: [],
    },
    {
        _id: "event-october",
        _clientId: "djfhjaskjdfa",
        title: null,
        text: null,
        image: null,
        reminderTime: null,
        eventTime: nov,
        pinned: true,
        tags: [],
        relatedNotes: [],
    },
    {
        _id: "event-december",
        _clientId: "djfhjaskjdfa",
        title: null,
        text: null,
        image: null,
        reminderTime: null,
        eventTime: dec,
        pinned: true,
        tags: [],
        relatedNotes: [],
    },
    {
        _id: "no-event",
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

const DashboardView = (): //eventNotes: INote[],
//pinnedNotes: INote[]
JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");
    const navigateNotes = () => history.push("/notes");

    // Boot user out if not logged in
    useEffect(() => {
        if (!store.getState().user.account) history.push("/login");
    });

    /* Filter the Event Notes, up to 3 */
    const eventNotes = [
        {
            _id: "event-november",
            _clientId: "djfhjaskjdfa",
            title: null,
            text: null,
            image: null,
            reminderTime: null,
            eventTime: nov,
            pinned: true,
            tags: [],
            relatedNotes: [],
        },
        {
            _id: "event-october",
            _clientId: "djfhjaskjdfa",
            title: null,
            text: null,
            image: null,
            reminderTime: null,
            eventTime: nov,
            pinned: true,
            tags: [],
            relatedNotes: [],
        },
        {
            _id: "event-december",
            _clientId: "djfhjaskjdfa",
            title: null,
            text: null,
            image: null,
            reminderTime: null,
            eventTime: dec,
            pinned: true,
            tags: [],
            relatedNotes: [],
        },
    ];

    /*
    eventNotes = filterNotes(eventNotes, FilterOn.EVENT_TIME);
    if (eventNotes.length > 3) {
        eventNotes.slice(0, 4);
    }*/

    /* Filter the Pinned Notes, up to 4 */
    /*
    pinnedNotes = filterNotes(pinnedNotes, FilterOn.PINNED);
    if (pinnedNotes.length > 4) {
        pinnedNotes.slice(0, 5);
    }*/

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
