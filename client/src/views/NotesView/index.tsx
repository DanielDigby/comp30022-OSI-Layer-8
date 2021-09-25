/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

// Semantic UI button

import globalStyles from "../../App.module.css";
import MenuItem from "./Menu";
import SearchBarItem from "./SearchBar";
import ProfileImage from "./ProfileImage";
import styles from "./NotesView.module.css";

import { useHistory } from "react-router-dom";

{
    /* CSS used for the notes section */
}
import dndStyles from "./dragAndDrop.module.css";
import { DropdownItem } from "semantic-ui-react";

{
    /* Package to help with smooth drag n drop features */
}
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { types } from "@babel/core";

{
    /* SAMPLE NOTES DATA USED FOR DRAG AND DROP TESTING */
}

const testNotes = [
    {
        id: 1,
        name: "note1",
    },
    {
        id: 2,
        name: "note2",
    },
    {
        id: 3,
        name: "note3",
    },
    {
        id: 4,
        name: "note4",
    },
    {
        id: 5,
        name: "note5",
    },
];
const NotesView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");

    const [notes, updateNotes] = useState(testNotes);
    // api call

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

            {/* Main notes area? */}
            <div className={dndStyles.notesSection}>
                <div className={dndStyles.column}>
                    {testNotes.map((note) => (
                        <li key={note.id} className={dndStyles.item}>
                            {note.name}
                        </li>
                    ))}
                </div>
            </div>

            {/* Searchbar on top right corner */}
            <div className={styles.containerRight}>
                <SearchBarItem />
            </div>
        </div>
    );
};
export default NotesView;
