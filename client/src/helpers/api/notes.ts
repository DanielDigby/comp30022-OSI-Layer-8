import { INote } from "../../interfaces/note";
import { store } from "../../config/redux/store";
import {
    createNote,
    updateNote,
    deleteNote,
} from "../../config/redux/noteSlice";

export const createNoteAPI = (note: INote): void => {
    store.dispatch(createNote(note));
};

export const updateNoteAPI = (note: INote): void => {
    store.dispatch(updateNote(note));
};

export const deleteNoteAPI = (id: string): void => {
    store.dispatch(deleteNote(id));
};
