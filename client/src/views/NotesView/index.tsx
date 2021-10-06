import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
// Semantic UI button
import { DnD, DnDModes, ColumnDict } from "../../components/DnD";
import { INote } from "../../interfaces/note";
import globalStyles from "../../App.module.css";
import MenuItem from "./Menu";
import SearchBarItem from "./SearchBar";
import ProfileImage from "./ProfileImage";
import styles from "./NotesView.module.css";
import { store } from "../../config/redux/store";
import { useHistory } from "react-router-dom";

const NotesView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");

    /* State for our drag and drop */

    // Boot user out if not logged in
    useEffect(() => {
        if (!store.getState().user.account) history.push("/login");
    });

    const testNotes: Array<INote> = [
        {
            title: "NOTE TEST 1",
            _id: null,
            _clientId: uuid(),
            text: "note1",
            image: null,
            reminderTime: null,
            eventTime: null,
            pinned: false,
            tags: [],
            relatedNotes: [],
        },
        {
            title: "NOTE TEST 2",
            _id: null,
            _clientId: uuid(),
            text: "note2",
            image: null,
            reminderTime: null,
            eventTime: null,
            pinned: false,
            tags: [],
            relatedNotes: [],
        },
        {
            title: "NOTE TEST 3",
            _id: null,
            _clientId: uuid(),
            text: "note3",
            image: null,
            reminderTime: null,
            eventTime: null,
            pinned: false,
            tags: [],
            relatedNotes: [],
        },
        {
            title: "NOTE TEST 4",
            _id: null,
            _clientId: uuid(),
            text: "note4",
            image: null,
            reminderTime: null,
            eventTime: null,
            pinned: false,
            tags: [],
            relatedNotes: [],
        },
        {
            title: "NOTE TEST 5",
            _id: null,
            _clientId: uuid(),
            text: "note5",
            image: null,
            reminderTime: null,
            eventTime: null,
            pinned: false,
            tags: [],
            relatedNotes: [],
        },
    ];

    // api call
    const initialColumns: ColumnDict = {
        /* UUID returns a segment of bytes, which isn't a valid identifier. JS requires us to use
        segment-literal notation. Basically for uuid() to be a key, need to wrap in []. */
        [uuid()]: {
            name: "col1",
            items: testNotes,
        },
        [uuid()]: {
            name: "col2",
            items: [],
        },
        [uuid()]: {
            name: "col3",
            items: [],
        },
        [uuid()]: {
            name: "col4",
            items: [],
        },
    };

    const [columns, updateColumns] = useState(initialColumns);
    /* Do we need to reshuffle and render notes into their respective columns? */

    return (
        <div className={globalStyles.light}>
            {/* Sidebar with profile pic */}
            <div className={styles.containerLeft}>
                <ProfileImage
                    firstName="Sonja"
                    lastName="Pedell"
                    onClick={navigateDashboard}
                />
                <MenuItem />
            </div>

            {/* Main notes area 
            Pass in:
            the updateColumns state function defined on line 110
            the columns data structure, initially set to initialColumns
            */}
            <DnD
                updateColumns={updateColumns}
                columns={columns}
                mode={DnDModes.NOTES}
            />

            {/* Searchbar on top right corner */}
            <div className={styles.containerRight}>
                <SearchBarItem />
            </div>
        </div>
    );
};
export default NotesView;
