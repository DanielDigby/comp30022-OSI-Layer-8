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
    { id: "1", content: "note1" },
    { id: "2", content: "note2" },
];

const testNotes2 = [
    { id: "3", content: "note3" },
    { id: "4", content: "note4" },
];

const testColumns = [
    {
        name: "col1",
        items: testNotes,
    },
    {
        name: "col2",
        items: testNotes2,
    },
];

const NotesView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");

    /* State for our drag and drop */
    const [columns, updateColumns] = useState(testColumns);
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
                <DragDropContext onDragEnd={(result) => console.log(result)}>
                    {Object.entries(testColumns).map(([id, column]) => {
                        return (
                            <Droppable droppableId={id} key={id}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={dndStyles.column}
                                        >
                                            {/* Inside each column, now spawn all the note items */}
                                            {column.items.map((item, index) => {
                                                return (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => {
                                                            return (
                                                                <div
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={
                                                                        dndStyles.item
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            snapshot.draggingOver
                                                                                ? "#263B4A"
                                                                                : "#456C86",
                                                                        ...provided
                                                                            .draggableProps
                                                                            .style,
                                                                    }}
                                                                >
                                                                    {
                                                                        item.content
                                                                    }
                                                                </div>
                                                            );
                                                        }}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        );
                    })}
                </DragDropContext>
            </div>

            {/* Searchbar on top right corner */}
            <div className={styles.containerRight}>
                <SearchBarItem />
            </div>
        </div>
    );
};
export default NotesView;
