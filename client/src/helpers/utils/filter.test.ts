import { filterNotes } from "./filter";
import { INote } from "../../interfaces/note";

describe("Notes filter utils", () => {
    it(
        "When an array of length 0 is passed expect return to be\n" +
            "\t an empty array",
        () => {
            // arrange
            const notes = new Array<INote>();

            // act
            const output = filterNotes(notes, "Pinned");

            // assert
            expect(output.length).toBe(0);
        }
    );

    describe("Filter notes by pinned", () => {
        it(
            "When an array of length 1 with 1 pinned note is passed expect return to be\n" +
                "\t a single note",
            () => {
                // arrange
                const notes = [
                    {
                        _id: "a",
                        _clientId: "djfhjaskjdfa",
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

                // act
                const output = filterNotes(notes, "Pinned");

                // assert
                expect(output.length).toBe(1);
            }
        );
    });
    describe("Filter notes by Event Time", () => {
        it(
            "When an array of length 1 with 1 Event note is passed expect return to be\n" +
                "\t a single note",
            () => {
                // arrange
                const notes = [
                    {
                        _id: "a",
                        _clientId: "djfhjaskjdfa",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: new Date(),
                        pinned: true,
                        tags: [],
                        relatedNotes: [],
                    },
                ];

                // act
                const output = filterNotes(notes, "EventTime");

                // assert
                expect(output.length).toBe(1);
            }
        );
    });
});
