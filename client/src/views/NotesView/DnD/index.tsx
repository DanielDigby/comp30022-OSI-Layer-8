import React from "react";
import { INote, NoteModes } from "../../../interfaces/note";
import Note from "../../../components/Note";
import dndStyles from "./dragAndDrop.module.css";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import { RootState } from "../../../config/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateColumns } from "../../../config/redux/noteSlice";
import { isEmptyColumns } from "../../../helpers/utils/columns";

import { ColumnDict } from "../../../interfaces/columns";

export const DnD = (): JSX.Element => {
    const dispatch = useDispatch();
    const store = useSelector((state: RootState) => state);
    const columns: ColumnDict = store.notes.columnDict;
    const update = (columns: ColumnDict) => {
        dispatch(updateColumns(columns));
    };

    if (isEmptyColumns(columns))
        return <div className={dndStyles.noNotes}>No notes to display</div>;
    // IMPORTANT:
    // Idea here is to define the styles for different DnD layouts in dragAndDrop.module.css
    // and switch based on mode - all other logic should be able to stay same
    return (
        <div className={dndStyles.scroll}>
            <div className={dndStyles.dndContainer}>
                <div className={dndStyles.notesSection}>
                    <DragDropContext
                        onDragEnd={(result: DropResult) =>
                            onDragEnd(result, columns, update)
                        }
                    >
                        {/* For every column */}
                        {Object.entries(columns).map(([id, column]) => {
                            return (
                                <Droppable droppableId={id} key={id}>
                                    {(provided) => {
                                        return (
                                            <div
                                                id={id}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={dndStyles.column}
                                            >
                                                {column.items.map(
                                                    (
                                                        note: INote,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            /* Wrap each item in draggable */
                                                            <Draggable
                                                                key={
                                                                    note._clientId
                                                                }
                                                                draggableId={
                                                                    note._clientId
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
                                                                                    snapshot.draggingOver,
                                                                                ...provided
                                                                                    .draggableProps
                                                                                    .style,
                                                                            }}
                                                                        >
                                                                            {/* THIS DIV IS WHERE THE NOTE OBJECT SHOULD BE RENDERED */}
                                                                            <Note
                                                                                note={
                                                                                    note
                                                                                }
                                                                                mode={
                                                                                    NoteModes.STANDARD
                                                                                }
                                                                            />
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
            </div>
        </div>
    );
};

const onDragEnd = (
    result: DropResult,
    columns: ColumnDict,
    updateColumns: (columns: ColumnDict) => void
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
