import { INote } from "./note";

export interface ColumnDict {
    [x: string]: {
        name: string;
        items: Array<INote>;
    };
}

/* Data structure that keeps track of the notes and their ids */
export interface StringMap {
    arr1: Array<string>;
    arr2: Array<string>;
    arr3: Array<string>;
}
