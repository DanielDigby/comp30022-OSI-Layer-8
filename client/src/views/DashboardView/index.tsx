import React from "react";
import Note from "../../components/Note";
import styles from "./DashboardView.module.css";
import Profile from "../../components/Profile";
import globalStyles from "./../../App.module.css";
import { Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import { useHistory } from "react-router-dom";
import { capitalize } from "lodash";
import { checkAuthAPI } from "../../helpers/api/users";
import { INote, NoteModes } from "../../interfaces/note";
import { filterNotes, FilterOn } from "../../helpers/utils/filter";

const DashboardView = (): JSX.Element => {
    const history = useHistory();
    checkAuthAPI(history);
    const navigateNotes = () => {
        history.push("/notes");
    };
    const navigateSettings = () => {
        history.push("/settings");
    };

    const store = useSelector((state: RootState) => state);
    const notes = store.notes.array;
    const name = store.user.account.firstName;

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
                    <Greeting {...{ name }} />

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

                <div className={styles.bottomContainer}>
                    <div className={styles.calendarContainer}>
                        <Icon
                            name="calendar alternate"
                            color="orange"
                            size="big"
                        />
                    </div>
                    <EventNotes {...{ notes }} />
                    <div className={styles.tumbtackContainer}>
                        <Icon name="thumbtack" color="orange" size="big" />
                    </div>
                    <PinnedNotes {...{ notes }} />
                </div>
                {store.user.isNewLogin && <InstallPrompt />}
            </div>
        </div>
    );
};

export default DashboardView;

type GreetingProps = {
    name: string;
};
const Greeting = ({ name }: GreetingProps): JSX.Element => {
    const now = new Date(Date.now());
    const hr = now.getHours();
    let welcome;
    if (hr < 12) welcome = "Good morning";
    else if (hr < 18) welcome = "Good afternoon";
    else welcome = "Good evening";

    const date = now.toLocaleString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return (
        <div className={styles.greetingsContainer}>
            <div className={styles.heading}>
                <div className={styles.greeting}>
                    {welcome}, <br />
                    {capitalize(name)}
                </div>
                <div className={styles.date}>{date}</div>
            </div>
        </div>
    );
};

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

type EventNotesProps = {
    notes: Array<INote>;
};
const EventNotes = ({ notes }: EventNotesProps) => {
    let eventNotes = filterNotes(notes, FilterOn.EVENT_TIME);
    if (eventNotes.length > 3) {
        eventNotes = eventNotes.slice(0, 3);
    }
    if (eventNotes.length === 0)
        return <div className={styles.noNotes}>No events to display</div>;
    return (
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
    );
};

type PinnedNotesProps = {
    notes: Array<INote>;
};
const PinnedNotes = ({ notes }: PinnedNotesProps) => {
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
    if (pinnedNotes1.length === 0)
        return <div className={styles.noNotes}>No pinned notes to display</div>;
    return (
        <div className={styles.pinnedNotesContainer}>
            <div className={styles.pinnedTopContainer}>
                {pinnedNotes1.map((note: INote) => {
                    return (
                        <div key={note._id} className={styles.pinnedSpacer}>
                            <Note note={note} mode={NoteModes.STANDARD} />
                        </div>
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
    );
};
