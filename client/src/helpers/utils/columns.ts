import { ColumnDict, StringMap } from "../../interfaces/columns";
import { INote } from "../../interfaces/note";
import _ from "lodash";

export const mapNotesToColumns = (notes: Array<INote>): ColumnDict => {
    const temp = _.cloneDeep(notes);
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];

    while (temp.length !== 0) {
        if (temp.length % 3 === 0) {
            const note = temp.shift();
            if (note) arr3.push(note);
        }
        if (temp.length % 2 === 0) {
            const note = temp.shift();
            if (note) arr2.push(note);
        } else {
            const note = temp.shift();
            if (note) arr1.push(note);
        }
    }

    const newDict = {
        ["col1"]: {
            name: "col1",
            items: arr1,
        },
        ["col2"]: {
            name: "col2",
            items: arr2,
        },
        ["col3"]: {
            name: "col3",
            items: arr3,
        },
    };

    return newDict;
};

/* function that converts a string dictionary to columns */
export const stringMapToColumns = (
    stringMap: StringMap,
    notes: Array<INote>
): ColumnDict => {
    /* If stringMap is empty but notes is not, then throw an error */
    if (
        stringMap.arr1.length === 0 &&
        stringMap.arr2.length === 0 &&
        stringMap.arr3.length === 0 &&
        !(notes.length === 0)
    )
        throw new Error("StringMap empty but notes is not empty\n");

    /* Use these ararys to fill in the columnDict */

    const arr1: Array<INote> = stringMap.arr1.map((clientId) => {
        const note = notes.find((note) => note._clientId === clientId);

        if (note) return note;

        throw new Error("Failed to map array 1\n");
    });

    const arr2: Array<INote> = stringMap.arr2.map((clientId) => {
        const note = notes.find((note) => note._clientId === clientId);

        if (note) return note;

        throw new Error("Failed to map array 2\n");
    });

    const arr3: Array<INote> = stringMap.arr3.map((clientId) => {
        const note = notes.find((note) => note._clientId === clientId);

        if (note) return note;

        throw new Error("Failed to map array 3\n");
    });

    /* Return this new column dict with the new notes from StringMap */
    const outDict = {
        ["col1"]: {
            name: "col1",
            items: arr1,
        },
        ["col2"]: {
            name: "col2",
            items: arr2,
        },
        ["col3"]: {
            name: "col3",
            items: arr3,
        },
    };

    return outDict;
};

/* Converts a column dict into a StringMap object holding the client ids of each note */
export const columnsToStringMap = (columns: ColumnDict): StringMap => {
    /* Output map */
    const outMap = {
        arr1: columns["col1"].items.map((x) => x._clientId),
        arr2: columns["col2"].items.map((x) => x._clientId),
        arr3: columns["col3"].items.map((x) => x._clientId),
    };

    return outMap;
};

export const removeNoteFromColumnDict = (
    removeNote: INote,
    columns: ColumnDict
): ColumnDict => {
    if (!removeNote) return columns;

    const arr1 = columns["col1"].items.filter(
        (note) => note._clientId !== removeNote._clientId
    );
    const arr2 = columns["col2"].items.filter(
        (note) => note._clientId !== removeNote._clientId
    );
    const arr3 = columns["col3"].items.filter(
        (note) => note._clientId !== removeNote._clientId
    );

    const outDict = {
        ["col1"]: {
            name: "col1",
            items: arr1,
        },
        ["col2"]: {
            name: "col2",
            items: arr2,
        },
        ["col3"]: {
            name: "col3",
            items: arr3,
        },
    };

    return outDict;
};

export const removeNoteFromStringMap = (
    removeNote: INote,
    stringMap: StringMap
): StringMap => {
    if (!removeNote) return stringMap;

    stringMap.arr1 = stringMap.arr1.filter(
        (_clientId) => _clientId !== removeNote._clientId
    );
    stringMap.arr2 = stringMap.arr2.filter(
        (_clientId) => _clientId !== removeNote._clientId
    );
    stringMap.arr3 = stringMap.arr3.filter(
        (_clientId) => _clientId !== removeNote._clientId
    );

    return stringMap;
};

export const addNoteToStringMap = (
    note: INote,
    stringMap: StringMap
): StringMap => {
    stringMap.arr1.unshift(note._clientId);
    return stringMap;
};

export const addNoteToColumnDict = (
    note: INote,
    columns: ColumnDict
): ColumnDict => {
    columns["col1"].items.unshift(note);
    return columns;
};

export const isEmptyColumns = (columns: ColumnDict): boolean => {
    const arr1Len = columns["col1"].items.length;
    const arr2Len = columns["col2"].items.length;
    const arr3Len = columns["col3"].items.length;

    if (arr1Len === 0 && arr2Len === 0 && arr3Len == 0) return true;

    return false;
};
