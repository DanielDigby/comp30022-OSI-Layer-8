import { INote } from "../../interfaces/note";

export const searchNotes = (
    notes: INote[],
    searchKeywords: string
): INote[] => {
    const keywords = searchKeywords.toLowerCase().split(" ");

    const filteredNotes = notes.filter((note) => {
        let text = "";
        if (note.title) {
            text = text.concat(note.title.toLowerCase());
        }
        if (note.text) {
            text = text.concat(note.text.toLowerCase());
        }
        if (note.image) {
            text = text.concat(note.image.toLowerCase());
        }

        if (keywords.some((keyword) => text.includes(keyword))) {
            return true;
        }
        return false;
    });

    return filteredNotes;
};
