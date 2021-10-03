import { INote, INoteWithoutIds } from "../../interfaces/note";
import { store } from "../../config/redux/store";
import {
    createNote,
    updateNote,
    deleteNote,
} from "../../config/redux/noteSlice";

export const createNoteAPI = (note: INoteWithoutIds): void => {
    store.dispatch(createNote(note));
};

export const updateNoteAPI = (note: INote): void => {
    store.dispatch(updateNote(note));
};

export const deleteNoteAPI = (note: INote): void => {
    if (note._id) store.dispatch(deleteNote(note._id));
};
