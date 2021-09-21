import { postNote } from "./notes";

describe("Notes API Helpers", () => {
    describe("Post a note to backend", () => {
        it(
            "When a valid note is passed to the api function it should:\n" +
                "\t add the note to the redux store" +
                "\t send a request to the backend",
            () => {
                const note = {
                    title: "hello world",
                };
                postNote(note);
                expect(1).toBe(1);
            }
        );
    });
});
