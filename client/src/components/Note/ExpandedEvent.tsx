import React from "react";
import styles from "./ExpandedEvent.module.css";
import "semantic-ui-css/semantic.min.css";
//import { INote, NoteModes } from "../../interfaces/note";
import { INote } from "../../interfaces/note";

import Tag from "../Tag";
import HeadingText from "../HeadingText";
import { Icon } from "semantic-ui-react";

//import { store } from "../../config/redux/store";

/* Deleted NotesText folder and it's working now */
/*
interface NoteProps {
    note: INote;
    mode: NoteModes;
} */

const sept = new Date("August 19, 2022");
//sept.setFullYear(2021, 8, 10);

const testNote: INote = {
    user: null,
    _id: "sdjfasdfa",
    _clientId: "sfhkjasd",
    title: "event title here",
    text: "test",
    image: "test",
    reminderTime: null,
    eventTime: sept,
    pinned: false,
    tags: [],
    relatedNotes: [],
};

//const dateString = testNote.eventTime?.toString;

const ExpandedEvent = (): JSX.Element => {
    // api call
    return (
        <div className={styles.Segment}>
            <div className="ui raised segment">
                <div className={styles.topContainer}>
                    <div className={styles.wordsContainer}>
                        <div className={styles.headingContainer}>
                            <b>Heading Here</b>
                        </div>
                        <div className={styles.textContainer}>
                            hello sfajgdskv dafsdv lsdkvaldsfij vbdfbls vldivh
                            sdvlkdv sdslvsdv shdv akvjdsvs dvladsv testing
                            testing 123 asglfblj fabf@#%@#$^# v shdv akvjdsvs
                            dvladsv testing testing 123 asglfblj fabf@#%@#$^# v
                            shdv akvjdsvs dvladsv testing testing 123 asglfblj
                            fabf@#%@#$^# v sh
                        </div>
                        <a>
                            <Tag tagName="Social" />
                        </a>
                    </div>
                    <div className={styles.iconsContainer}>
                        <Icon name="bell slash outline" size="large" />
                    </div>
                </div>
                <div className={styles.footerContainer}>
                    <div className={styles.goToNote}>
                        Go to Note
                        <Icon name="angle right" size="large" />
                    </div>
                    <div className={styles.timeAndClock}>
                        <Icon name="clock outline" size="large" />
                        <div className={styles.smallGap}></div>
                        Aug 30, 7:30 PM
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandedEvent;
