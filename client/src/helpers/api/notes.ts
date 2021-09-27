import { INote } from "../../interfaces/note";
import { store } from "../../config/redux/store";
import {
    createNote,
    deleteNote,
    updateNote,
} from "../../config/redux/noteSlice";

export const postNote = (note: INote): void => {
    store.dispatch(createNote(note));
};
