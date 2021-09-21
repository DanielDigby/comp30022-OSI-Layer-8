import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote } from "../../interfaces/note";
export interface NoteState {
    notes: Array<INote>;
}

const initialState: NoteState = {
    notes: [],
};

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        loadNotes: (state, action: PayloadAction<Array<INote>>) => {
            state.notes = action.payload;
        },
        clearNotes: (state) => {
            state.notes = [];
        },
        createNote: {
            reducer: (state, action: PayloadAction<INote>) => {
                state.notes.push(action.payload);
            },
            prepare: (note) => {
                return {
                    payload: note,
                    meta: {
                        offline: {
                            effect: {
                                url: "/api/notes",
                                method: "POST",
                                data: note,
                            },
                            // TODO (Daniel) commit
                            // TODO (Daniel) rollback
                        },
                    },
                };
            },
        },
        updateNote: (state, action: PayloadAction<INote>) => {
            const note = state.notes.find(
                (note) => note._id === action.payload._id
            );
            if (note) {
                // TODO (Daniel) check that this works
                Object.assign(note, action.payload);
            }
        },
        deleteNote: (state, action: PayloadAction<INote>) => {
            state.notes.filter((note) => note._id !== action.payload._id);
        },
    },
});

export const { createNote, updateNote, deleteNote } = noteSlice.actions;

export default noteSlice.reducer;
