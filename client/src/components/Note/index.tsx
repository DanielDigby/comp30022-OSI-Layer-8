import React, { useState } from "react";
import Edit from "./Edit";
import Standard from "./Standard";
import StandardDetail from "./StandardDetail";
import EventNoteView from "./DashboardEvent/EventNoteView";
import ExpandedEvent from "./DashboardEvent/ExpandedEvent";
import { INote, NoteModes } from "../../interfaces/note";

interface NoteProps {
    note: INote;
    mode: NoteModes;
}
const Note = ({ note, mode }: NoteProps): JSX.Element => {
    const [currentMode, toggleCurrentMode] = useState(mode);

    const standardClick = () => {
        toggleCurrentMode(NoteModes.STANDARD_DETAIL);
    };
    const detailClick = () => {
        toggleCurrentMode(NoteModes.STANDARD);
    };
    const expandEvent = () => {
        toggleCurrentMode(NoteModes.EVENT_DETAIL);
    };
    const minimizeEvent = () => {
        toggleCurrentMode(NoteModes.EVENT);
    };

    switch (currentMode) {
        // onClick={toggleCurrentMode(NoteModes.STANDARD_DETAIL)}
        case NoteModes.STANDARD:
            return (
                <div onClick={standardClick}>
                    <Standard note={note} />
                </div>
            );
        case NoteModes.STANDARD_DETAIL:
            return (
                <div onClick={detailClick}>
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
                <div onClick={minimizeEvent}>
                    <ExpandedEvent note={note} />
                </div>
            );
        case NoteModes.EDIT:
            return <Edit note={note} />;
        default:
            return <div />;
    }
};

export default Note;
