import { INote } from "../../interfaces/note";

/* Filter Notes by Pinned, EventTime, ReminderTime, and tags */
export const filterNotes = (notes: INote[], filterOn: string): INote[] => {
    let filtered: INote[];
    switch (filterOn) {
        case "Pinned":
            filtered = notes.filter((note) => note.pinned === true);
            break;

        case "EventTime":
            filtered = notes
                .filter((note) => note.eventTime !== null)
                .sort((a, b) => {
                    if (a.eventTime === null || b.eventTime == null) return 0;
                    return b.eventTime.valueOf() - a.eventTime.valueOf();
                });
            break;

        case "ReminderTime":
            filtered = notes
                .filter((note) => note.reminderTime !== null)
                .sort((a, b) => {
                    if (a.reminderTime === null || b.reminderTime == null)
                        return 0;
                    return b.reminderTime.valueOf() - a.reminderTime.valueOf();
                });
            break;

        default:
            filtered = notes.filter(
                (note) =>
                    note.tags !== undefined && note.tags.includes(filterOn)
            );
    }
    return filtered;
};
