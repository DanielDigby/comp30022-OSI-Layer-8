import { columnsToStringMap, stringMapToColumns } from "./columns";
import { ColumnDict, StringMap } from "../../interfaces/columns";
import { INote } from "../../interfaces/note";

describe("DnD Columns utils", () => {
    describe("stringMapToColumns tests", () => {
        it("When empty array input, expect a columnDict with no items returned\n", () => {
            const stringMap: StringMap = {
                arr1: [],
                arr2: [],
                arr3: [],
            };

            const notes: Array<INote> = [];
            const output = stringMapToColumns(stringMap, notes);

            expect(output["col1"].items.length).toBe(0);
            expect(output["col2"].items.length).toBe(0);
            expect(output["col3"].items.length).toBe(0);
        });

        it("When empty notes array but non-empty string map is passed, expect an error to be thrown\n", () => {
            const stringMap: StringMap = {
                arr1: ["Asdasdasd"],
                arr2: [],
                arr3: [],
            };

            const notes: Array<INote> = [];

            expect(() => stringMapToColumns(stringMap, notes)).toThrow();
        });

        it("When non-empty notes array but empty string map is passed, expect an error to be thrown\n", () => {
            const stringMap: StringMap = {
                arr1: [],
                arr2: [],
                arr3: [],
            };

            const notes = [
                {
                    _id: "a",
                    _clientId: "djfhjaskjdfa",
                    user: "asfhdklasdjfl",
                    title: null,
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                },
            ];

            expect(() => stringMapToColumns(stringMap, notes)).toThrow();
        });

        it("When mapping notes, expect the structure to be the same\n", () => {
            const stringMap: StringMap = {
                arr1: ["note1"],
                arr2: [],
                arr3: ["note2"],
            };

            const notes = [
                {
                    _id: "a",
                    _clientId: "note2",
                    user: "asfhdklasdjfl",
                    title: null,
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                },
                {
                    _id: "a",
                    _clientId: "note1",
                    user: "asfhdklasdjfl",
                    title: null,
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                },
            ];

            const expectedOutput = {
                ["col1"]: {
                    name: "col1",
                    items: [
                        {
                            _id: "a",
                            _clientId: "note1",
                            user: "asfhdklasdjfl",
                            title: null,
                            text: null,
                            image: null,
                            reminderTime: null,
                            eventTime: null,
                            pinned: true,
                            tags: [],
                            relatedNotes: [],
                        },
                    ],
                },
                ["col2"]: {
                    name: "col2",
                    items: [],
                },
                ["col3"]: {
                    name: "col3",
                    items: [
                        {
                            _id: "a",
                            _clientId: "note2",
                            user: "asfhdklasdjfl",
                            title: null,
                            text: null,
                            image: null,
                            reminderTime: null,
                            eventTime: null,
                            pinned: true,
                            tags: [],
                            relatedNotes: [],
                        },
                    ],
                },
            };

            const output = stringMapToColumns(stringMap, notes);

            expect(output).toMatchObject(expectedOutput);
        });
    });
});
