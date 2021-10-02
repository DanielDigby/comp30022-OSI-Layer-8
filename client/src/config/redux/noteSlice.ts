import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote, INoteWithoutIds } from "../../interfaces/note";
import { v4 as uuidv4 } from "uuid";
import { AxiosResponse } from "axios";
import { NOTES } from "../../interfaces/endpoints";
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
        // sets new notes array
        setNotes: (state, action: PayloadAction<Array<INote>>) => {
            state.array = action.payload;
        },

        // create a note and post to backend
        createNote: {
            reducer: (state, action: PayloadAction<INote>) => {
                state.array.push(action.payload);
            },
            prepare: (note: INoteWithoutIds) => {
                // create and assign _clientId
                (note as INote)._clientId = uuidv4();

                return {
                    // save the temp note
                    payload: note as INote,
                    meta: {
                        offline: {
                            // send original note to server
                            effect: {
                                url: NOTES,
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
                    (note) => note._clientId === action.payload._clientId
                );
                if (note) {
                    Object.assign(note, action.payload);
                }
            },
            prepare: (note: INote) => {
                return {
                    payload: note,
                    meta: {
                        offline: {
                            effect: {
                                url: NOTES + note._clientId,
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
            reducer: (state, action: PayloadAction<INote>) => {
                const index = state.array.findIndex((note) => {
                    return note._clientId === action.payload._clientId;
                });
                if (index !== -1) state.array.splice(index, 1);
            },
            prepare: (note: INote) => {
                return {
                    payload: note,
                    meta: {
                        offline: {
                            effect: {
                                url: NOTES + note._id,
                                method: "DELETE",
                            },
                        },
                    },
                };
            },
        },
    },
});

export const { setNotes, createNote, updateNote, deleteNote } =
    noteSlice.actions;

export default noteSlice.reducer;
