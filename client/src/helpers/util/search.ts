import { INote } from "../../interfaces/note";

export const searchNotes = (notes: INote[], keyword: string): INote[] => {
    const filteredNotes = notes.filter(note => {
        return note.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        note.text?.toLowerCase().includes(keyword.toLowerCase());
    })

    return filteredNotes;
}