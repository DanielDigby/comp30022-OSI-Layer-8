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
import { copyFileSync } from "fs";

import { uuid } from "uuidv4";

{
    /* SAMPLE NOTES DATA USED FOR DRAG AND DROP TESTING */
}

const itemsFromBackend = [
    { id: uuid(), content: "note1" },
    { id: uuid(), content: "note2" },
    { id: uuid(), content: "note3" },
    { id: uuid(), content: "note4" },
    { id: uuid(), content: "note5" },
];

const testColumns = {
    [uuid()]: {
        name: "col1",
        items: itemsFromBackend,
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
const onDragEnd = (
    result: { source: any; destination?: any },
    columns: any,
    updateColumns: any
) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
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
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        updateColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};

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
                <DragDropContext
                    onDragEnd={(result: any) =>
                        onDragEnd(result, columns, updateColumns)
                    }
                >
                    {/* For every column */}
                    {Object.entries(columns).map(([id, column]) => {
                        console.log(column);
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
                                            {column.items.map(
                                                (
                                                    item: {
                                                        id: any;
                                                        content: any;
                                                    },
                                                    index
                                                ) => {
                                                    return (
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
