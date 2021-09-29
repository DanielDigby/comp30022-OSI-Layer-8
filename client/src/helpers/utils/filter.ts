/* https://www.codegrepper.com/code-examples/javascript/filter+logic+react */

import React from "react";
import { INote } from "../../interfaces/note";

const userNotes = [
    {
        //title: "NEW NOTE TEST",
        //_clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
        tags: ["hello", "event"],
        //relatedNotes: [],
        id: "61514289e3c2e405ab49db7e",
        content: "hello",
    },
    {
        //title: "SECOND NOTE",
        //_clientId: "75072f77-3b31-40f7-b3b7-5e46f4ea9abc",
        tags: ["nothing"],
        //relatedNotes: [],
        id: "61514289e3c2e405ab4abcde",
        content: "note 2",
    },
];

export const filterNotes = (inputNotes: INote[], filterOn: string): INote[] => {
    const temp = inputNotes.filter((inputNote) => inputNote.tags != undefined);

    if (filterOn === "Pinned") {
        const filtered = inputNotes.filter(
            (inputNote) => inputNote.pinned === true
        );
        return filtered;
    } else if (filterOn === "EventTime") {
        const filtered = inputNotes.filter(
            (inputNote) => inputNote.eventTime !== null
        );
        return filtered;
    } else if (filterOn === "ReminderTime") {
        const filtered = inputNotes.filter(
            (inputNote) => inputNote.reminderTime !== null
        );
        return filtered;
    } else {
        const filtered = temp.filter(
            (note) => note.tags !== undefined && note.tags.includes(filterOn)
        );
        return filtered;
    }
};
