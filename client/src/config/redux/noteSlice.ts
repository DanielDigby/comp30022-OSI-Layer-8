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
        // should attempt to load notes from backend
        loadNotes: (state, action: PayloadAction<Array<INote>>) => {
            state.notes = action.payload;
        },

        // sets new notes array once loadNotes completes?
        setNotes: (state, action: PayloadAction<Array<INote>>) => {
            state.notes = action.payload;
        },

        // clear notes on logout
        clearNotes: (state) => {
            state.notes = [];
        },

        // create a note and post to backend
        createNote: {
            reducer: (state, action: PayloadAction<INote>) => {
                state.notes.push(action.payload);
            },
            prepare: (note: INote) => {
                return {
                    payload: note,
                    meta: {
                        offline: {
                            effect: {
                                url: "/api/notes",
                                method: "POST",
                                data: note,
                            },
                            // TODO (Daniel) commit: update note id
                            // TODO (Daniel) rollback
                        },
                    },
                };
            },
        },

        // update a note and patch to backend
        updateNote: {
            reducer: (state, action: PayloadAction<INote>) => {
                const note = state.notes.find(
                    (note) => note._id === action.payload._id
                );
                if (note) {
                    // TODO (Daniel) check that this works
                    Object.assign(note, action.payload);
                }
            },
            prepare: (note: INote) => {
                return {
                    payload: note,
                    meta: {
                        offline: {
                            effect: {
                                url: `/api/notes/${note._id}`,
                                method: "PUT",
                                data: note,
                            },
                        },
                    },
                };
            },
        },

        // delete a note and delete to backend
        deleteNote: {
            reducer: (state, action: PayloadAction<string>) => {
                state.notes.filter((note) => note._id !== action.payload);
            },
            prepare: (id: string) => {
                return {
                    payload: id,
                    meta: {
                        offline: {
                            effect: {
                                url: `/api/notes/${id}`,
                                method: "DELETE",
                            },
                        },
                    },
                };
            },
        },
    },
});

export const { createNote, updateNote, deleteNote } = noteSlice.actions;

export default noteSlice.reducer;
