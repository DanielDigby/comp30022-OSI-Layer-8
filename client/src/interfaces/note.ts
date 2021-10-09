export interface INote extends INoteWithoutIds {
    _id: string | null;
    _clientId: string;
}

export interface INoteWithoutIds {
    user: string | null;
    title: string | null;
    text: string | null;
    image: string | null;
    reminderTime: Date | null;
    eventTime: Date | null;
    pinned: boolean;
    tags: Array<string>;
    relatedNotes: Array<string>;
}

export enum NoteModes {
    STANDARD,
    STANDARD_DETAIL,
    EVENT,
    EVENT_DETAIL,
    EDIT,
}

export interface NoteProps {
    note: INote;
    mode: NoteModes;
}
