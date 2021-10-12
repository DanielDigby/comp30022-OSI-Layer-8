/* eslint-disable security/detect-object-injection */
// dictionary access injection sink only used with internally generated val
import { ColumnDict } from "../../views/NotesView/DnD";
import { INote } from "../../interfaces/note";
import _ from "lodash";
import { v4 as uuid } from "uuid";

export const mapNotesToColumns = (notes: Array<INote>): ColumnDict => {
    const temp = _.cloneDeep(notes);
    const id1 = uuid();
    const id2 = uuid();
    const id3 = uuid();
    const newDict = {
        [id1]: {
            name: "col1",
            items: new Array<INote>(),
        },
        [id2]: {
            name: "col2",
            items: new Array<INote>(),
        },
        [id3]: {
            name: "col3",
            items: new Array<INote>(),
        },
    };

    while (temp.length !== 0) {
        if (temp.length % 3 === 0) {
            const note = temp.shift();
            if (note) newDict[id3].items.push(note);
        }
        if (temp.length % 2 === 0) {
            const note = temp.shift();
            if (note) newDict[id2].items.push(note);
        } else {
            const note = temp.shift();
            if (note) newDict[id1].items.push(note);
        }
    }
    return newDict;
};
