import React from "react";
import { checkAuthAPI } from "../../helpers/api/users";
import { useSelector } from "react-redux";
import globalStyles from "./../../App.module.css";
import styles from "./DashboardView.module.css";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import Profile from "../../components/Profile";
import { RootState } from "../../config/redux/store";
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

    checkAuthAPI(history);

    const store = useSelector((state: RootState) => state);
    const notes = store.notes.array;

    /* store.getState the arrays of notes */
    //const allNotes = store.getState().notes.array;
    let eventNotes = filterNotes(notes, FilterOn.EVENT_TIME);
    if (eventNotes.length > 3) {
        eventNotes = eventNotes.slice(0, 3);
    }

    /* Filter the Pinned Notes, up to 3 */
    const pinnedNotes = filterNotes(notes, FilterOn.PINNED);
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
            <div className={styles.leftBanner}>
                <Profile />
                <div className={styles.cog}>
                    <Icon
                        name="cog"
                        size="big"
                        color="grey"
                        onClick={() => navigateSettings()}
                    />
                </div>
            </div>
            <div className={styles.main}>
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

const InstallPrompt = (): JSX.Element => {
    return (
        <div className={styles.InstallPrompt}>
            <Icon name="download" />
            <div>
                Cara can be installed on mobile devices by tapping on your
                browser options, then selecting <b>Add to Home screen</b>
            </div>
        </div>
    );
};
