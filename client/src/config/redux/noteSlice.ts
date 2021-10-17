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
    removeNoteFromColumnDict,
    removeNoteFromStringMap,
    addNoteToColumnDict,
    addNoteToStringMap,
} from "../../helpers/utils/columns";
import { filter } from "../../helpers/utils/filter";
import { searchNotes } from "../../helpers/utils/search";

export interface NoteState {
    array: Array<INote>;
    stringMap: StringMap;
    tempMap: StringMap;
    columnDict: ColumnDict;
    filter: string;
    search: string;
    searchLoading: boolean;
    editing: INote | null;
}

const initialState: NoteState = {
    array: [],
    stringMap: { arr1: [], arr2: [], arr3: [] },
    tempMap: { arr1: [], arr2: [], arr3: [] },
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

                // after adding to notes array also add to column dict and string
                // maps for ui state
                state.columnDict = addNoteToColumnDict(
                    action.payload,
                    state.columnDict
                );
                state.stringMap = addNoteToStringMap(
                    action.payload,
                    state.stringMap
                );
                state.tempMap = addNoteToStringMap(
                    action.payload,
                    state.tempMap
                );
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
        // updating ui is handled by edit reducers as notes can only be updated
        // via edit actions
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
                                url: NOTES + "/" + note._clientId,
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

                // after deleting a note remove it from both string maps and
                // columns dict to update ui
                state.columnDict = removeNoteFromColumnDict(
                    action.payload,
                    state.columnDict
                );
                state.stringMap = removeNoteFromStringMap(
                    action.payload,
                    state.stringMap
                );
                state.tempMap = removeNoteFromStringMap(
                    action.payload,
                    state.tempMap
                );
            },
            prepare: (note: INote) => {
                return {
                    payload: note,
                    meta: {
                        offline: {
                            effect: {
                                url: NOTES + "/" + note._clientId,
                                method: "DELETE",
                                data: "delete",
                            },
                        },
                    },
                };
            },
        },

        setEditing: (state, action: PayloadAction<INote | null>) => {
            // when we set editing to a note we want to remove the note from the
            // current column dict
            if (action.payload) {
                state.tempMap = columnsToStringMap(state.columnDict);
                state.columnDict = removeNoteFromColumnDict(
                    action.payload,
                    state.columnDict
                );
            }

            state.editing = action.payload;
        },

        clearEditing: (state) => {
            // we want to add what we were last editing back into column dict
            if (state.editing) {
                console.log("hello");
                state.columnDict = stringMapToColumns(
                    state.tempMap,
                    state.array
                );
            }
            state.editing = null;
        },

        loadPage: (state) => {
            state.columnDict = mapNotesToColumns(state.array);
            state.stringMap = columnsToStringMap(state.columnDict);
        },

        updateColumns: (state, action: PayloadAction<ColumnDict>) => {
            state.columnDict = action.payload;
            if (state.filter === "" && state.search === "")
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
