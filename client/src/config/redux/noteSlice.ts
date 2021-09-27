import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote } from "../../interfaces/note";
import { v4 as uuidv4 } from "uuid";
import { AxiosResponse } from "axios";
export interface NoteState {
    array: Array<INote>;
}

const initialState: NoteState = {
    array: [],
};

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        // should attempt to load notes from backend
        loadNotes: (state, action: PayloadAction<Array<INote>>) => {
            state.array = action.payload;
        },

        // sets new notes array once loadNotes completes?
        setNotes: (state, action: PayloadAction<Array<INote>>) => {
            state.array = action.payload;
        },

        // clear notes on logout
        clearNotes: (state) => {
            state.array = [];
        },

        // create a note and post to backend
        createNote: {
            reducer: (state, action: PayloadAction<INote>) => {
                state.array.push(action.payload);
            },
            prepare: (note: INote) => {
                // create and assign _clientId
                note._clientId = uuidv4();

                return {
                    // save the temp note
                    payload: note,
                    meta: {
                        offline: {
                            // send original note to server
                            effect: {
                                url: "/api/notes",
                                method: "POST",
                                data: note,
                            },
                            // update note once response recieved with mongodb id
                            commit: {
                                type: "note/updateNoteAfterResponse",
                            },
                            // TODO (Daniel) rollback
                        },
                    },
                };
            },
        },

        // update a note and patch to backend
        updateNote: {
            reducer: (state, action: PayloadAction<INote>) => {
                const note = state.array.find(
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

        // set a note id after api response completes
        updateNoteAfterResponse: (
            state,
            action: PayloadAction<AxiosResponse<INote>>
        ) => {
            const note = state.array.find(
                (note) => note._clientId === action.payload.data._clientId
            );
            if (note) {
                Object.assign(note, action.payload.data);
            }
        },

        // delete a note and send delete to backend
        deleteNote: {
            reducer: (state, action: PayloadAction<string>) => {
                const index = state.array.findIndex((note) => {
                    return note._id === action.payload;
                });
                if (index !== -1) state.array.splice(index, 1);
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

export const {
    loadNotes,
    setNotes,
    clearNotes,
    createNote,
    updateNote,
    deleteNote,
} = noteSlice.actions;

export default noteSlice.reducer;
