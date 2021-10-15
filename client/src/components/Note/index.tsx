import React, { useState } from "react";
import Edit from "./Edit";
import Standard from "./Standard";
import StandardDetail from "./StandardDetail";
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
            return <div />;
        case NoteModes.EVENT_DETAIL:
            return <div />;
        case NoteModes.EDIT:
            return <Edit note={note} />;
        default:
            return <div />;
    }
};

export default Note;
