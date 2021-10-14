import { ColumnDict } from "../../views/NotesView/DnD";
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

export const isEmptyColumns = (columns: ColumnDict): boolean => {
    const arr1Len = columns["col1"].items.length;
    const arr2Len = columns["col2"].items.length;
    const arr3Len = columns["col3"].items.length;

    if (arr1Len === 0 && arr2Len === 0 && arr3Len == 0) return true;

    return false;
};
