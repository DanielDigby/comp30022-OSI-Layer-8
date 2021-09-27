export interface INote {
    _id?: string;
    _clientId?: string;
    title?: string;
    text?: string;
    image?: string;
    reminderTime?: Date;
    eventTime?: Date;
    pinned?: boolean;
    tags?: Array<string>;
    relatedNotes?: Array<string>;
}
