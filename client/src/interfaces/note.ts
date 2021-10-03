export interface INote extends INoteWithoutIds {
    _id: string | null;
    _clientId: string;
}

export interface INoteWithoutIds {
    title: string | null;
    text: string | null;
    image: string | null;
    reminderTime: Date | null;
    eventTime: Date | null;
    pinned: boolean;
    tags: Array<string>;
    relatedNotes: Array<string>;
}
