import React, { useEffect } from "react";
import styles from "./DashboardView.module.css";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import ProfileImage from "../NotesView/ProfileImage";
import { store } from "../../config/redux/store";

import { filterNotes, FilterOn } from "../../helpers/utils/filter";
<<<<<<< HEAD
import { INote, NoteModes } from "../../interfaces/note";
import Note from "../../components/Note";
=======
import { INote } from "../../interfaces/note";
>>>>>>> b0bb9b1b39f2cd603249e77beb790fed7ef0003b

const DashboardView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");
    const navigateNotes = () => history.push("/notes");

    // Boot user out if not logged in
    useEffect(() => {
        if (!store.getState().user.account) history.push("/login");
    });

    /* get the First name of User */
<<<<<<< HEAD
    //const firstName = store.getState().user.firstName;

    const oct = new Date();
    oct.setFullYear(2021, 10, 31);
    const nov = new Date();
    nov.setFullYear(2021, 11, 20);
    const dec = new Date();
    dec.setFullYear(2021, 12, 10);

    const allNotes: Array<INote> = [
        {
            _id: "sdjfasdfa",
            _clientId: "sfhkjasd",
            title: "event-october",
            text: "test",
            image: "test",
            reminderTime: null,
            eventTime: oct,
            pinned: false,
            tags: [],
            relatedNotes: [],
        },
        {
            _id: "alvndslks",
            _clientId: "hdjaasdsdakjasd",
            title: "event-december",
            text: "test",
            image: "test",
            reminderTime: null,
            eventTime: dec,
            pinned: false,
            tags: [],
            relatedNotes: [],
        },
        {
            _id: "alsdkfasd",
            _clientId: "hdjafsaasd",
            title: "no event or pin",
            text: "test",
            image: "test",
            reminderTime: null,
            eventTime: null,
            pinned: false,
            tags: [],
            relatedNotes: [],
        },
        {
            _id: "aslslfvjd",
            _clientId: "sfhkjasd",
            title: "event-november",
            text: "test",
            image: "test",
            reminderTime: null,
            eventTime: nov,
            pinned: false,
            tags: [],
            relatedNotes: [],
        },
        {
            _id: "sdhfjhas",
            _clientId: "hdjaasdsdakjasd",
            title: "pinned-one",
            text: "test",
            image: "test",
            reminderTime: null,
            eventTime: null,
            pinned: true,
            tags: [],
            relatedNotes: [],
        },
        {
            _id: "sfkadfklhasdfa",
            _clientId: "hdjafsaasd",
            title: "pinned-two",
            text: "test",
            image: "test",
            reminderTime: null,
            eventTime: null,
            pinned: true,
            tags: [],
            relatedNotes: [],
        },
        {
            _id: "sfkadfknxmxcnx",
            _clientId: "hdjafsaasd",
            title: "pinned-three",
            text: "test",
            image: "test",
            reminderTime: null,
            eventTime: null,
            pinned: true,
            tags: [],
            relatedNotes: [],
        },
        {
            _id: "sfjsncohslcmx",
            _clientId: "hdjafsaasd",
            title: "pinned-four",
            text: "test",
            image: "test",
            reminderTime: null,
            eventTime: null,
            pinned: true,
            tags: [],
            relatedNotes: [],
        },
    ];

    /* store.getState the arrays of notes */
    //const allNotes = store.getState().notes.array;
    let eventNotes = filterNotes(allNotes, FilterOn.EVENT_TIME);
    if (eventNotes.length > 3) {
        eventNotes = eventNotes.slice(0, 3);
    }

    /* Filter the Pinned Notes, up to 3 */
    let pinnedNotes = filterNotes(allNotes, FilterOn.PINNED);
    if (pinnedNotes.length > 3) {
        pinnedNotes = pinnedNotes.slice(0, 3);
=======
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
>>>>>>> b0bb9b1b39f2cd603249e77beb790fed7ef0003b
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
<<<<<<< HEAD
                        <h1>Sonja</h1>
=======
                        <h1>{firstName}</h1>
>>>>>>> b0bb9b1b39f2cd603249e77beb790fed7ef0003b
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
<<<<<<< HEAD
                    {eventNotes.map((note: INote) => {
                        return (
                            <Note
                                note={note}
                                mode={NoteModes.STANDARD}
                                key={note._id}
                            />
                        );
=======
                    {eventNotes.map(function (content, idx) {
                        return <li key={idx}>{content._id}</li>;
>>>>>>> b0bb9b1b39f2cd603249e77beb790fed7ef0003b
                    })}
                </div>

                <div className={styles.tumbtackContainer}>
                    <Icon name="thumbtack" size="big" />
                </div>
<<<<<<< HEAD
                <div className={styles.pinnedContainer}>
                    {pinnedNotes.map((note: INote) => {
                        return (
                            <Note
                                note={note}
                                mode={NoteModes.STANDARD}
                                key={note._id}
                            />
                        );
                    })}
                </div>
=======
                <div className={styles.pinnedContainer}></div>
>>>>>>> b0bb9b1b39f2cd603249e77beb790fed7ef0003b
            </div>
        </div>
    );
};

export default DashboardView;
