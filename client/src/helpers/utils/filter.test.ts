import { filterNotes, FilterOn } from "./filter";
import { INote } from "../../interfaces/note";

describe("Notes filter utils", () => {
    it(
        "When an array of length 0 is passed expect return to be\n" +
            "\t an empty array",
        () => {
            // arrange
            const notes = new Array<INote>();

            // act
            const output = filterNotes(notes, FilterOn.PINNED);

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
                const output = filterNotes(notes, FilterOn.PINNED);

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
                const output = filterNotes(notes, FilterOn.EVENT_TIME);
                // const output = filterNotes(
                //     notes,
                //     FilterOn.CUSTOM_TAG,
                //     "Memories"
                // );

                // assert
                expect(output.length).toBe(1);
            }
        );
        it(
            "When there's 4 notes, with 3 Event notes is passed - expect return to be\n" +
                "\t 3 notes in date order",
            () => {
                // arrange
                const nov = new Date();
                nov.setFullYear(2021, 11, 20);
                const oct = new Date();
                oct.setFullYear(2021, 10, 31);
                const dec = new Date();
                dec.setFullYear(2021, 12, 10);
                const notes = [
                    {
                        _id: "december",
                        _clientId: "djfhjaskjdfa",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: dec,
                        pinned: true,
                        tags: [],
                        relatedNotes: [],
                    },
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
                    {
                        _id: "october",
                        _clientId: "djasdfsdf",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: oct,
                        pinned: true,
                        tags: [],
                        relatedNotes: [],
                    },
                    {
                        _id: "november",
                        _clientId: "djfhsdf",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: nov,
                        pinned: true,
                        tags: [],
                        relatedNotes: [],
                    },
                ];

                // act
                const output = filterNotes(notes, FilterOn.EVENT_TIME);

                // assert
                expect(output.length).toBe(3);
                expect(output[0]._id).toBe("october");
                expect(output[1]._id).toBe("november");
                expect(output[2]._id).toBe("december");
            }
        );
    });
    describe("Filter notes by Reminder Time", () => {
        it(
            "When an array of length 1 with 1 Reminder note is passed expect return to be\n" +
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
                        reminderTime: new Date(),
                        eventTime: null,
                        pinned: true,
                        tags: [],
                        relatedNotes: [],
                    },
                ];

                // act
                const output = filterNotes(notes, FilterOn.REMINDER_TIME);

                // assert
                expect(output.length).toBe(1);
            }
        );
        it(
            "When an array of length 3 with 2 Reminder notes is passed expect return to be\n" +
                "\t 2 notes in date order",
            () => {
                // arrange
                const notes = [
                    {
                        _id: "a",
                        _clientId: "djfasdfdfa",
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
                        _id: "b",
                        _clientId: "djsadfssdf",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: new Date(25),
                        eventTime: null,
                        pinned: true,
                        tags: [],
                        relatedNotes: [],
                    },
                    {
                        _id: "c",
                        _clientId: "djassdfsddf",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: new Date(20),
                        eventTime: null,
                        pinned: true,
                        tags: [],
                        relatedNotes: [],
                    },
                ];

                // act
                const output = filterNotes(notes, FilterOn.REMINDER_TIME);

                // assert
                //expect(output.length).toBe(2);
                expect(output[0]._id).toBe("c");
            }
        );
        it(
            "Array of length 3 with 0 Reminder notes is passed expect return to be\n" +
                "\t 0 notes in date order",
            () => {
                // arrange
                const notes = [
                    {
                        _id: "a",
                        _clientId: "djfasdfdfa",
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
                        _id: "b",
                        _clientId: "djsadfssdf",
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
                        _id: "c",
                        _clientId: "djassdfsddf",
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
                const output = filterNotes(notes, FilterOn.REMINDER_TIME);

                // assert
                expect(output.length).toBe(0);
            }
        );
    });
    describe("Filter notes by Custom Tags", () => {
        it(
            "When an array of length 1 with 1 Tag note is passed expect return to be\n" +
                "\t a single note",
            () => {
                // arrange
                const notes = [
                    {
                        _id: "a",
                        _clientId: "djfhwerdfa",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: null,
                        pinned: true,
                        tags: ["hello"],
                        relatedNotes: [],
                    },
                ];

                // act
                const output = filterNotes(notes, FilterOn.CUSTOM_TAG, "hello");

                // assert
                expect(output.length).toBe(1);
            }
        );
        it(
            "When an array of length 3 with 2 Tag note (hello) is passed expect return to be\n" +
                "\t 2 notes",
            () => {
                // arrange
                const notes = [
                    {
                        _id: "a",
                        _clientId: "dsklkmbdfdfa",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: null,
                        pinned: true,
                        tags: ["hello"],
                        relatedNotes: [],
                    },
                    {
                        _id: "b",
                        _clientId: "dopopopopf",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: null,
                        pinned: true,
                        tags: ["goodbye"],
                        relatedNotes: [],
                    },
                    {
                        _id: "c",
                        _clientId: "djadf",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: null,
                        pinned: true,
                        tags: ["hello"],
                        relatedNotes: [],
                    },
                ];

                // act
                const output = filterNotes(notes, FilterOn.CUSTOM_TAG, "hello");

                // assert
                expect(output.length).toBe(2);
            }
        );
        it(
            "When an array of length 3 with 0 Tag note 'hello' is passed expect return to be\n" +
                "\t 0 notes",
            () => {
                // arrange
                const notes = [
                    {
                        _id: "a",
                        _clientId: "dsklkmbdfdfa",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: null,
                        pinned: true,
                        tags: ["no"],
                        relatedNotes: [],
                    },
                    {
                        _id: "b",
                        _clientId: "dopopopopf",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: null,
                        pinned: true,
                        tags: ["no"],
                        relatedNotes: [],
                    },
                    {
                        _id: "c",
                        _clientId: "djadf",
                        title: null,
                        text: null,
                        image: null,
                        reminderTime: null,
                        eventTime: null,
                        pinned: true,
                        tags: ["no"],
                        relatedNotes: [],
                    },
                ];

                // act
                const output = filterNotes(notes, FilterOn.CUSTOM_TAG, "hello");

                // assert
                expect(output.length).toBe(0);
            }
        );
    });
});
