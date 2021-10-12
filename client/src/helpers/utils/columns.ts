import { ColumnDict } from "../../views/NotesView/DnD";
import { INote } from "../../interfaces/note";
import _ from "lodash";
import { v4 as uuid } from "uuid";

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
        [uuid()]: {
            name: "col1",
            items: arr1,
        },
        [uuid()]: {
            name: "col2",
            items: arr2,
        },
        [uuid()]: {
            name: "col3",
            items: arr3,
        },
    };

    return newDict;
};
