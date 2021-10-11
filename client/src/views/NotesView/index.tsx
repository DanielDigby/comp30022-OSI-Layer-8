import React, { useState } from "react";
import { v4 as uuid } from "uuid";
// Semantic UI button
import { DnD, ColumnDict } from "../../components/DnD";
import globalStyles from "../../App.module.css";
import MenuItem from "./Menu";
import { Search, Grid } from "semantic-ui-react";
import Profile from "../../components/Profile";
import styles from "./NotesView.module.css";
import NewNote from "./NewNote";
import { useHistory } from "react-router-dom";
import { checkAuthAPI } from "../../helpers/api/users";
import { useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";

const NotesView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/");
    const store = useSelector((state: RootState) => state);

    checkAuthAPI(history);

    // api call
    const initialColumns: ColumnDict = {
        /* UUID returns a segment of bytes, which isn't a valid identifier. JS requires us to use
        segment-literal notation. Basically for uuid() to be a key, need to wrap in []. */
        [uuid()]: {
            name: "col1",
            items: [
                {
                    user: store.user.account,
                    title: "NOTE TEST 1",
                    _id: "dsfradsf",
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
                    user: store.user.account,
                    title: "NOTE TEST 2",
                    _id: "dsfradsf",
                    _clientId: uuid(),
                    text: "note2",
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: false,
                    tags: [],
                    relatedNotes: [],
                },
            ],
        },
        [uuid()]: {
            name: "col2",
            items: [
                {
                    user: store.user.account,
                    title: "NOTE TEST 3",
                    _id: "dsfradsf",
                    _clientId: uuid(),
                    text: "note3",
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: false,
                    tags: [],
                    relatedNotes: [],
                },
            ],
        },
        [uuid()]: {
            name: "col3",
            items: [
                {
                    user: store.user.account,
                    title: "NOTE TEST 4",
                    _id: "dsfradsf",
                    _clientId: uuid(),
                    text: "note4",
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: false,
                    tags: [],
                    relatedNotes: [],
                },
            ],
        },
    };

    const [columns, updateColumns] = useState(initialColumns);
    /* Do we need to reshuffle and render notes into their respective columns? */

    return (
        <div className={globalStyles.light}>
            {/* Sidebar with profile pic */}
            <div className={styles.staticLeft}>
                <div>
                    <Profile onClick={navigateDashboard} />

                    <MenuItem />
                </div>
                <NewNote />
            </div>
            {/* Main notes area 
            Pass in:
            the updateColumns state function defined on line 110
            the columns data structure, initially set to initialColumns
            */}
            <div className={styles.main}>
                {/* Searchbar on top right corner */}
                <div className={styles.containerRight}>
                    <Grid>
                        <Grid.Column width={6}>
                            <Search placeholder="Search notes" />
                        </Grid.Column>
                    </Grid>
                </div>
                <DnD updateColumns={updateColumns} columns={columns} />
            </div>
        </div>
    );
};
export default NotesView;
