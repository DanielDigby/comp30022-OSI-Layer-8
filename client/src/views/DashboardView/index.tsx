import React from "react";
import { checkAuthAPI } from "../../helpers/api/users";
import { useSelector } from "react-redux";
import globalStyles from "./../../App.module.css";
import styles from "./DashboardView.module.css";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import Profile from "../../components/Profile";
import { RootState } from "../../config/redux/store";
import { InstallPrompt } from "./InstallPrompt";
import { capitalize } from "lodash";

import { filterNotes, FilterOn } from "../../helpers/utils/filter";
import { INote, NoteModes } from "../../interfaces/note";
import Note from "../../components/Note";

const DashboardView = (): JSX.Element => {
    const history = useHistory();
    const navigateNotes = () => {
        history.push("/notes");
    };
    const navigateSettings = () => {
        history.push("/settings");
    };
    const store = useSelector((state: RootState) => state);

    checkAuthAPI(history);

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
        <div className={globalStyles.light}>
            <div className={styles.basecontainer}>
                <div className={styles.topcontainer}>
                    <Profile />
                    <div className={styles.cog}>
                        <Icon
                            name="cog"
                            size="large"
                            color="grey"
                            onClick={() => navigateSettings()}
                        />
                    </div>
                </div>

                <div className={styles.midContainer}>
                    <div className={styles.margin} />
                    <div className={styles.midContentContainer}>
                        <div className={styles.greetingsContainer}>
                            <div className={styles.heading}>
                                <div className={styles.greeting}>
                                    Good Morning, <br />
                                    {capitalize(store.user.account.firstName)}
                                </div>
                                <div className={styles.date}>
                                    {new Date(Date.now()).toLocaleString(
                                        "en-US",
                                        {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.viewNotesContainer}>
                            <Icon
                                name="arrow right"
                                size="big"
                                color="grey"
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
                        <Icon
                            name="calendar alternate"
                            color="orange"
                            size="big"
                        />
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
                        <Icon name="thumbtack" color="orange" size="big" />
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
        </div>
    );
};

export default DashboardView;
