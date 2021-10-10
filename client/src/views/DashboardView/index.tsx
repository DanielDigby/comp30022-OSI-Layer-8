import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsNewLogin } from "../../config/redux/userSlice";
import styles from "./DashboardView.module.css";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import ProfileImage from "../NotesView/ProfileImage";
import { RootState } from "../../config/redux/store";
import { register } from "../../serviceWorkerRegistration";
import { InstallPrompt } from "./InstallPrompt";

import { filterNotes, FilterOn } from "../../helpers/utils/filter";
import { INote, NoteModes } from "../../interfaces/note";
import Note from "../../components/Note";

const DashboardView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => {
        if (store.user.isNewLogin) dispatch(toggleIsNewLogin());
        history.push("/dashboard");
    };
    const navigateNotes = () => {
        if (store.user.isNewLogin) dispatch(toggleIsNewLogin());
        history.push("/notes");
    };
    const store = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    // Boot user out if not logged in
    if (!store.user.account) history.push("/login");

    /* get the First name of User */
    //const firstName = store.getState().user.firstName;

    const oct = new Date();
    oct.setFullYear(2021, 10, 31);
    const nov = new Date();
    nov.setFullYear(2021, 11, 20);
    const dec = new Date();
    dec.setFullYear(2021, 12, 10);

    const allNotes: Array<INote> = [
        {
            user: store.user.account,
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
            user: store.user.account,
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
            user: store.user.account,
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
            user: store.user.account,
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
            user: store.user.account,
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
            user: store.user.account,
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
            user: store.user.account,
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
            user: store.user.account,
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
        {
            user: store.user.account,
            _id: "sfjsqoqoqx",
            _clientId: "hdjafsaasd",
            title: "pinned-five",
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
    const pinnedNotes = filterNotes(allNotes, FilterOn.PINNED);
    let pinnedNotes1: Array<INote> = [];
    let pinnedNotes2: Array<INote> = [];
    if (pinnedNotes.length <= 2) {
        pinnedNotes1 = pinnedNotes.slice(0, 2);
        pinnedNotes2;
    } else if (pinnedNotes.length === 3) {
        pinnedNotes1 = pinnedNotes.slice(0, 2);
        pinnedNotes2 = pinnedNotes.slice(2, 3);
    } else {
        pinnedNotes1 = pinnedNotes.slice(0, 2);
        pinnedNotes2 = pinnedNotes.slice(2, 4);
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
                <div className={styles.margin} />
                <div className={styles.midContentContainer}>
                    <div className={styles.greetingsContainer}>
                        <div className={styles.heading}>
                            <h1>Good Morning,</h1>
                            <h1>Sonja</h1>
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
            </div>

            <div className={styles.bottomContainer}>
                <div className={styles.calendarContainer}>
                    <Icon name="calendar alternate" size="big" />
                </div>
                <div className={styles.eventsContainer}>
                    {eventNotes.map((note: INote) => {
                        return (
                            <Note
                                note={note}
                                mode={NoteModes.STANDARD}
                                key={note._id}
                            />
                        );
                    })}
                </div>

                <div className={styles.tumbtackContainer}>
                    <Icon name="thumbtack" size="big" />
                </div>
                <div className={styles.pinnedNotesContainer}>
                    <div className={styles.pinnedTopContainer}>
                        {pinnedNotes1.map((note: INote) => {
                            return (
                                <Note
                                    note={note}
                                    mode={NoteModes.STANDARD}
                                    key={note._id}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.somethingHorizontal} />
                    <div className={styles.pinnedBottomContainer}>
                        {pinnedNotes2.map((note: INote) => {
                            return (
                                <Note
                                    note={note}
                                    mode={NoteModes.STANDARD}
                                    key={note._id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            {store.user.isNewLogin && <InstallPrompt />}
        </div>
    );
};

export default DashboardView;
