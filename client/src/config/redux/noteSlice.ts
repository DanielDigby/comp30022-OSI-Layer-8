import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote, INoteWithoutIds } from "../../interfaces/note";
import { v4 as uuidv4 } from "uuid";
import { AxiosResponse } from "axios";
import { ColumnDict, StringMap } from "../../interfaces/columns";
import { NOTES } from "../../interfaces/endpoints";
import {
    columnsToStringMap,
    stringMapToColumns,
    mapNotesToColumns,
} from "../../helpers/utils/columns";
import { filter } from "../../helpers/utils/filter";
import { searchNotes } from "../../helpers/utils/search";

export interface NoteState {
    array: Array<INote>;
    stringMap: StringMap;
    columnDict: ColumnDict;
    filter: string;
    search: string;
    searchLoading: boolean;
    editing: INote | null;
}

const initialState: NoteState = {
    array: [],
    stringMap: { arr1: [], arr2: [], arr3: [] },
    columnDict: {
        ["col1"]: {
            name: "col1",
            items: [],
        },
        ["col2"]: {
            name: "col2",
            items: [],
        },
        ["col3"]: {
            name: "col3",
            items: [],
        },
    },
    filter: "",
    search: "",
    searchLoading: false,
    editing: null,
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
                state.array = state.array.filter(
                    (note) => note._clientId !== action.payload._clientId
                );
            },
            prepare: (note: INote) => {
                return {
                    payload: note,
                    meta: {
                        offline: {
                            effect: {
                                url: NOTES + note._clientId,
                                method: "DELETE",
                                data: "delete",
                            },
                        },
                    },
                };
            },
        },

        setEditing: (state, action: PayloadAction<INote>) => {
            state.editing = action.payload;
        },

        clearEditing: (state) => {
            state.editing = null;
        },

        loadPage: (state) => {
            state.columnDict = mapNotesToColumns(state.array);
            state.stringMap = columnsToStringMap(state.columnDict);
        },

        updateColumns: (state, action: PayloadAction<ColumnDict>) => {
            state.columnDict = action.payload;
            state.stringMap = columnsToStringMap(state.columnDict);
        },

        updateFilter: (state, action: PayloadAction<string>) => {
            if (state.filter === action.payload) {
                state.filter = "";
            } else {
                state.filter = action.payload;
            }
            if (state.filter === "" && state.search === "")
                state.columnDict = stringMapToColumns(
                    state.stringMap,
                    state.array
                );
            else {
                const filtered = filter(state.array, state.filter);
                const searched = searchNotes(filtered, state.search);
                state.columnDict = mapNotesToColumns(searched);
            }
        },

        clearSearch: (state) => {
            const filtered = filter(state.array, state.filter);
            state.search = "";
            if (state.filter === "" && state.search === "")
                state.columnDict = stringMapToColumns(
                    state.stringMap,
                    state.array
                );
            else {
                state.columnDict = mapNotesToColumns(filtered);
            }
            state.searchLoading = false;
        },

        startSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            state.searchLoading = true;
        },

        finishSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            state.searchLoading = false;
            const filtered = filter(state.array, state.filter);
            const searched = searchNotes(filtered, state.search);
            state.columnDict = mapNotesToColumns(searched);
        },
    },
});

export const {
    setNotes,
    createNote,
    updateNote,
    deleteNote,
    setEditing,
    clearEditing,
    loadPage,
    updateColumns,
    updateFilter,
    clearSearch,
    startSearch,
    finishSearch,
} = noteSlice.actions;

export default noteSlice.reducer;
