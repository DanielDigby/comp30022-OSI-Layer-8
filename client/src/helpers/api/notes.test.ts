import { createNoteAPI, updateNoteAPI, deleteNoteAPI } from "./notes";
import { clearNotes } from "../../config/redux/noteSlice";
import { RootState } from "../../config/redux/store";
import axios from "axios";
import * as uuid from "uuid";

jest.mock("axios");
jest.mock("uuid");

jest.mock("axios");

describe("Notes API Helpers", () => {
    describe("Post a note to backend", () => {
        beforeEach(() => {
            const dispatch = useDispatch();
            dispatch(clearNotes());
        });

        it(
            "When a valid note is passed it should:\n" +
                "\t add the note to the redux store\n" +
                "\t send a post request to the backend\n",
            async () => {
                // ARRANGE
                // Since we are mocking our api for this test we need to tell redux that it is ONLINE
                // if we do not do this it will not send an api request
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: true,
                    },
                });

                // This is the note we are creating
                const note = {
                    title: "NEW NOTE TEST",
                };
                // The note we expect back
                // notice the clientId, as well as the normal id field -
                // I am using a package called uuid to generate id's on the client side so we can find and
                // update the notes in the redux store once the api requests come back.
                //
                // The clientId's get generated in the createNote reducer
                // the backend id gets set in the updateNoteAfterResponse reducer
                const apiNote = {
                    title: "NEW NOTE TEST",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    tags: [],
                    relatedNotes: [],
                    _id: "61514289e3c2e405ab49db7e",
                };

                // mock the axios return value
                const mRes = { status: 200, data: apiNote };

                // this one looks weird because the way we call axios in redux is axios(requestConfig: {})
                // not axios.get(request:{}), so it needs to be mocked differently
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mRes);

                // here I mock the uuid generated _clientId to make sure that our api note expected object matches
                // the one that gets generated when saving to redux
                jest.spyOn(uuid, "v4").mockImplementation(
                    () => "75072f66-3b31-40f7-b3b7-5e46f4ea93fc"
                );

                // ACT
                createNoteAPI(note);

                // ASSERT
                // wait for 50ms to ensure that the fake api request resolves
                await new Promise((r) => setTimeout(r, 50));

                const notes = store.getState().notes.array;
                expect(axios).toHaveBeenCalledTimes(1);
                expect(notes[0]).toMatchObject(apiNote);
                // expect num times axios called = 1
            }
        );
    });

    describe("Patch a note to backend", () => {
        beforeEach(() => {
            store.dispatch(clearNotes());
        });

        it(
            "When a valid note is passed it should:\n" +
                "\t update the note to the redux store\n" +
                "\t send a patch request to the backend\n",
            async () => {
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: true,
                    },
                });
                const note = {
                    title: "NEW NOTE TEST",
                };
                const apiNote = {
                    title: "NEW NOTE TEST",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    tags: [],
                    relatedNotes: [],
                    _id: "61514289e3c2e405ab49db7e",
                };
                const mRes = { status: 200, data: apiNote };
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mRes);
                jest.spyOn(uuid, "v4").mockImplementation(
                    () => "75072f66-3b31-40f7-b3b7-5e46f4ea93fc"
                );
                createNoteAPI(note);
                await new Promise((r) => setTimeout(r, 50));

                const noteUpdated = {
                    title: "UPDATED NAME",
                    text: "NEW TEXT",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    tags: ["new user tag"],
                    relatedNotes: [],
                    _id: "61514289e3c2e405ab49db7e",
                };
                const mRes2 = { status: 200, data: noteUpdated };
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mRes2);

                updateNoteAPI(noteUpdated);

                const notes = store.getState().notes.array;
                expect(axios).toHaveBeenCalledTimes(2);
                expect(notes[0]).toMatchObject(noteUpdated);
            }
        );
    });

    describe("Delete a note to backend", () => {
        beforeEach(() => {
            store.dispatch(clearNotes());
        });

        it(
            "When a valid note is passed it should:\n" +
                "\t update the note to the redux store\n" +
                "\t send a patch request to the backend\n",
            async () => {
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: true,
                    },
                });
                const note = {
                    title: "NEW NOTE TEST",
                };
                const apiNote = {
                    title: "NEW NOTE TEST",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    tags: [],
                    relatedNotes: [],
                    _id: "61514289e3c2e405ab49db7e",
                };
                const mRes = { status: 200, data: apiNote };
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mRes);
                jest.spyOn(uuid, "v4").mockImplementation(
                    () => "75072f66-3b31-40f7-b3b7-5e46f4ea93fc"
                );
                createNoteAPI(note);
                await new Promise((r) => setTimeout(r, 50));

                const mRes2 = { status: 200 };
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mRes2);

                deleteNoteAPI(apiNote._id);

                const notes = store.getState().notes.array;
                expect(axios).toHaveBeenCalledTimes(2);
                expect(notes.length).toBe(0);
            }
        );
    });
});
