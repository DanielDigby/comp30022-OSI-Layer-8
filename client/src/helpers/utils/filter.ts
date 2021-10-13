import { INote } from "../../interfaces/note";

/* Filter Notes by Pinned, EventTime, ReminderTime, and tags, sorts by time */
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

export const filter = (notes: Array<INote>, filter: string): Array<INote> => {
    let filtered;
    if (filter === "") return notes;
    switch (filter) {
        case "Pinned":
            filtered = filterNotes(notes, FilterOn.PINNED);
            break;
        case "Reminders":
            filtered = filterNotes(notes, FilterOn.REMINDER_TIME);
            break;
        case "Events":
            filtered = filterNotes(notes, FilterOn.EVENT_TIME);
            break;
        default:
            filtered = filterNotes(notes, FilterOn.CUSTOM_TAG, filter);
    }
    return filtered;
};
