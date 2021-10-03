import { INote } from "../../interfaces/note";

export const searchNotes = (
    notes: INote[],
    searchKeywords: string
): INote[] => {
    const keywords = searchKeywords.split(" ");

    const filteredNotes = notes.filter((note) => {
        let text = "";
        if (note.title !== undefined) {
            text = text.concat(note.title?.toLowerCase());
        }
        if (note.text !== undefined) {
            text = text.concat(note.text?.toLowerCase());
        }
        if (note.image !== undefined) {
            text = text.concat(note.image?.toLowerCase());
        }

        if (keywords.some((keyword) => text.includes(keyword))) {
            return true;
        }
        return false;
    });

    return filteredNotes;
};
