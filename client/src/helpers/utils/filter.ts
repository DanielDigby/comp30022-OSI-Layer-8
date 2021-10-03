import { INote } from "../../interfaces/note";

/* Function to sort notes by Date */
/*
function sortByTime(inputNotes: INote[], noteType: string): any {
    // sorts Reminder notes by Date
    if (noteType === "ReminderTime") {
        inputNotes.sort(function compare(a, b) {
            if (a.reminderTime !== null && b.reminderTime !== null) {
                return b.reminderTime.valueOf() - a.reminderTime.valueOf();
            } else {
                return 0;
            }
        });
    }
    // Sorts Event notes by Date
    else {
        inputNotes.sort(function compare(a, b) {
            if (a.eventTime !== null && b.eventTime !== null) {
                return b.eventTime.valueOf() - a.eventTime.valueOf();
            } else {
                return 0;
            }
        });
    }
}*/

/* Filter Notes by Pinned, EventTime, ReminderTime, and tags */
export enum FilterOn {
    PINNED,
    EVENT_TIME,
    REMINDER_TIME,
    CUSTOM_TAG,
}
export const filterNotes = (
    notes: INote[],
    filterOn: FilterOn,
    customTag?: string
): INote[] => {
    let filtered: INote[];
    switch (filterOn) {
        case FilterOn.PINNED:
            filtered = notes.filter((note) => note.pinned === true);
            break;

        case FilterOn.EVENT_TIME:
            filtered = notes
                .filter((note) => note.eventTime !== null)
                .sort((a, b) => {
                    if (a.eventTime === null || b.eventTime === null) return 0;
                    return a.eventTime.valueOf() - b.eventTime.valueOf();
                });

            break;

        case FilterOn.REMINDER_TIME:
            filtered = notes
                .filter((note) => note.reminderTime !== null)
                .sort((a, b) => {
                    if (a.reminderTime === null || b.reminderTime === null)
                        return 0;
                    return a.reminderTime.valueOf() - b.reminderTime.valueOf();
                });
            break;

        case FilterOn.CUSTOM_TAG:
            if (!customTag)
                throw new Error(
                    "custom tag parameter must be supplied when filtering by custom tag"
                );
            filtered = notes.filter(
                (note) =>
                    note.tags !== undefined && note.tags.includes(customTag)
            );
    }
    return filtered;
};
