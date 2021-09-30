/* https://www.codegrepper.com/code-examples/javascript/filter+logic+react */

import React from "react";
import noteSlice from "../../config/redux/noteSlice";
import { INote } from "../../interfaces/note";

/* Function to sort notes by Date */
function sortByTime(inputNotes: INote[], noteType: string): any {
    // sorts Reminder notes by Date
    if (noteType === "ReminderTime") {
        inputNotes.sort(function compare(a, b) {
            if (a.reminderTime !== undefined && b.reminderTime !== undefined) {
                return b.reminderTime?.valueOf() - a.reminderTime?.valueOf();
            } else {
                return 0;
            }
        });
    }
    // Sorts Event notes by Date
    else {
        inputNotes.sort(function compare(a, b) {
            if (a.eventTime !== undefined && b.eventTime !== undefined) {
                return b.eventTime?.valueOf() - a.eventTime?.valueOf();
            } else {
                return 0;
            }
        });
    }
}

/* Filter Notes by Pinned, EventTime, ReminderTime, and tags */
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
        return sortByTime(filtered, "EventTime");
    } else if (filterOn === "ReminderTime") {
        const filtered = inputNotes.filter(
            (inputNote) => inputNote.reminderTime !== null
        );
        return sortByTime(filtered, "ReminderTime");
    } else {
        const filtered = temp.filter(
            (note) => note.tags !== undefined && note.tags.includes(filterOn)
        );
        return filtered;
    }
};
