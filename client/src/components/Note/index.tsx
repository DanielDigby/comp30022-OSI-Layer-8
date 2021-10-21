import React, { useEffect, useRef, useState } from "react";
import Edit from "./Edit";
import Standard from "./Standard";
import StandardDetail from "./StandardDetail";
import EventNoteView from "./DashboardEvent/EventNoteView";
import ExpandedEvent from "./DashboardEvent/ExpandedEvent";
import { INote, NoteModes } from "../../interfaces/note";

interface NoteProps {
    note: INote;
    mode: NoteModes;
    doneEditing?: () => void;
}
const Note = ({ note, mode, doneEditing }: NoteProps): JSX.Element => {
    const [currentMode, toggleCurrentMode] = useState(mode);

    const expandStandard = () => {
        toggleCurrentMode(NoteModes.STANDARD_DETAIL);
    };
    const minimizeStandard = () => {
        toggleCurrentMode(NoteModes.STANDARD);
    };

    const expandEvent = () => {
        toggleCurrentMode(NoteModes.EVENT_DETAIL);
    };
    const minimizeEvent = () => {
        toggleCurrentMode(NoteModes.EVENT);
    };

    const noteRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (
                !noteRef.current?.contains(event.target as Node) &&
                mode == NoteModes.STANDARD
            )
                minimizeStandard();
            if (
                !noteRef.current?.contains(event.target as Node) &&
                mode == NoteModes.EVENT
            )
                minimizeEvent();
        });
    });

    switch (currentMode) {
        case NoteModes.STANDARD:
            return (
                <div onClick={expandStandard}>
                    <Standard note={note} />
                </div>
            );
        case NoteModes.STANDARD_DETAIL:
            return (
                <div ref={noteRef}>
                    <StandardDetail note={note} />
                </div>
            );
        case NoteModes.EVENT:
            return (
                <div onClick={expandEvent}>
                    <EventNoteView note={note} />
                </div>
            );
        case NoteModes.EVENT_DETAIL:
            return (
                <div ref={noteRef}>
                    <ExpandedEvent note={note} />
                </div>
            );
        case NoteModes.EDIT:
            return (
                <Edit
                    note={note}
                    doneEditing={
                        doneEditing
                            ? doneEditing
                            : () => {
                                  return;
                              }
                    }
                />
            );
        default:
            return <div />;
    }
};

export default Note;
