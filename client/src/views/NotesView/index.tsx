import React, { useState, useEffect } from "react";

// Semantic UI button

import globalStyles from "../../App.module.css";
import MenuItem from "./Menu";
import SearchBarItem from "./SearchBar";
import ProfileImage from "./ProfileImage";
import styles from "./NotesView.module.css";
import { store } from "../../config/redux/store";
import { useHistory } from "react-router-dom";

{
    /* CSS used for the notes section */
}
import dndStyles from "./dragAndDrop.module.css";

{
    /* Package to help with smooth drag n drop features */
}
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";

import { v4 as uuid } from "uuid";

{
    /* SAMPLE NOTES DATA USED FOR DRAG AND DROP TESTING */
}

/* uuid generates a unique set of bytes, to use as a key for each object */
const testNotes = [
    { id: uuid(), content: "note1" },
    { id: uuid(), content: "note2" },
    { id: uuid(), content: "note3" },
    { id: uuid(), content: "note4" },
    { id: uuid(), content: "note5" },
];

const testColumns = {
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

{
    /* Function to allow us to render the new state after we drag and drop notes */
}

const NotesView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");

    /* State for our drag and drop */
    const [columns, updateColumns] = useState(testColumns);

    // Boot user out if not logged in
    useEffect(() => {
        if (!store.getState().user.account) history.push("/login");
    });

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

            {/* Main notes area */}
            <div className={dndStyles.notesSection}>
                <DragDropContext
                    onDragEnd={(result: DropResult) =>
                        onDragEnd(result, columns, updateColumns)
                    }
                >
                    {/* For every column */}
                    {Object.entries(columns).map(([id, column]) => {
                        return (
                            <Droppable droppableId={id} key={id}>
                                {(provided) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={dndStyles.column}
                                        >
                                            {/* Inside each column, now spawn all the note items */}
                                            {column.items.map(
                                                (
                                                    item: {
                                                        id: string;
                                                        content: string;
                                                    },
                                                    index
                                                ) => {
                                                    return (
                                                        /* Wrap each item in draggable */
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={
                                                                item.id
                                                            }
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
                                                                        /* If an item is being dragged, change its color */
                                                                        style={{
                                                                            backgroundColor:
                                                                                snapshot.draggingOver
                                                                                    ? "lightgrey"
                                                                                    : "grey",
                                                                            ...provided
                                                                                .draggableProps
                                                                                .style,
                                                                        }}
                                                                    >
                                                                        {/* THIS DIV IS WHERE THE NOTE OBJECT SHOULD BE RENDERED */}
                                                                        {
                                                                            item.content
                                                                        }
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                }
                                            )}
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

const onDragEnd = (
    result: DropResult,
    columns: typeof testColumns,
    updateColumns: React.Dispatch<
        React.SetStateAction<{
            [x: string]: {
                name: string;
                items: {
                    id: string;
                    content: string;
                }[];
            };
        }>
    >
) => {
    /* If we drag the box into an invalid destination (off the screen), don't update state */
    if (!result.destination) return;

    /* We need source and destination objects to update the state of our columns */
    const { source, destination } = result;

    /* If we're dropping a note into a different column */
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];

        /* Copy the items over */
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];

        /* Update the state of the source and destination column with the item update */
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        /* call the useState update function */
        updateColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        });
    } else {
        /* Otherwise, we're just dragging the item in the same column */
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];

        /* Reorder the items */
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        /* Update the column */
        updateColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};
