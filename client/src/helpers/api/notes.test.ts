import { createNoteAPI, updateNoteAPI, deleteNoteAPI } from "./notes";
import { RESET_STATE as RESET_OFFLINE } from "@redux-offline/redux-offline/lib/constants";
import {
    store,
    RootStateWithOffline,
    RESET_BASE,
} from "../../config/redux/store";
import axios from "axios";
import * as uuid from "uuid";

jest.mock("axios");
jest.mock("uuid");
jest.mock("redux-persist", () => {
    const real = jest.requireActual("redux-persist");
    return {
        ...real,
        persistReducer: jest
            .fn()
            .mockImplementation((config, reducers) => reducers),
    };
});

describe("Notes API Helpers", () => {
    afterEach(() => {
        store.dispatch({ type: RESET_OFFLINE });
        store.dispatch({ type: RESET_BASE });
    });

    describe("Post a note to backend", () => {
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
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                };
                // The note we expect back
                // notice the clientId, as well as the normal id field -
                // I am using a package called uuid to generate id's on the client side so we can find and
                // update the notes in the redux store once the api requests come back.
                //
                // The clientId's get generated in the createNote reducer
                // the backend id gets set in the updateNoteAfterResponse reducer
                const apiNote = {
                    _id: "61514289e3c2e405ab49db7e",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                };

                // mock the axios return value
                const mockRes = { status: 200, data: apiNote };

                // this one looks weird because the way we call axios in redux is axios(requestConfig: {})
                // not axios.get(request:{}), so it needs to be mocked differently
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mockRes);

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

        it(
            "When a valid note is passed it should:\n" +
                "\t add the note to the redux store\n" +
                "\t send a post request to the backend\n",
            async () => {
                //tell redux that it is OFFLINE
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: false,
                    },
                });

                const note = {
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                };
                const storeNote = {
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    title: "NEW NOTE TEST",
                    user: "sadfasdfas",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                };

                jest.spyOn(uuid, "v4").mockImplementation(
                    () => "75072f66-3b31-40f7-b3b7-5e46f4ea93fc"
                );

                // ACT
                createNoteAPI(note);
                // ASSERT
                await new Promise((r) => setTimeout(r, 50));

                const redux = store.getState();
                const outbox = (redux as RootStateWithOffline).offline.outbox;
                const notes = redux.notes.array;
                expect(outbox.length).toEqual(1);
                expect(notes[0]).toMatchObject(storeNote);
            }
        );
    });

    describe("Patch a note to backend", () => {
        it(
            "Creating and editiong a note while online\n" +
                "\t update the note to the redux store\n" +
                "\t send a patch request to the backend\n",
            async () => {
                //tell redux that it is ONLINE
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: true,
                    },
                });
                const note = {
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                };
                const apiNote = {
                    _id: "61514289e3c2e405ab49db7e",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                };
                const mockRes = { status: 200, data: apiNote };
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mockRes);
                jest.spyOn(uuid, "v4").mockImplementation(
                    () => "75072f66-3b31-40f7-b3b7-5e46f4ea93fc"
                );

                createNoteAPI(note);
                await new Promise((r) => setTimeout(r, 50));

                const noteUpdated = {
                    _id: "61514289e3c2e405ab49db7e",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    user: "sadfasdfas",
                    title: "UPDATED NAME",
                    text: "NEW TEXT",
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: ["new user tag"],
                    relatedNotes: [],
                };
                const mockRes2 = { status: 200, data: noteUpdated };
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mockRes2);

                updateNoteAPI(noteUpdated);

                const notes = store.getState().notes.array;
                expect(axios).toHaveBeenCalledTimes(2);
                expect(notes[0]).toMatchObject(noteUpdated);
            }
        );

        it(
            "Start offline, add note then update:\n" +
                "\t note to be updated in store\n" +
                "\t two requests are in outbox\n",
            async () => {
                //tell redux that it is OFFLINE
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: false,
                    },
                });

                const note = {
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: false,
                    tags: [],
                    relatedNotes: [],
                };

                jest.spyOn(uuid, "v4").mockImplementation(
                    () => "75072f66-3b31-40f7-b3b7-5e46f4ea93fc"
                );

                // ACT
                createNoteAPI(note);
                await new Promise((r) => setTimeout(r, 50));

                const noteUpdated = {
                    title: "UPDATED NAME",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    user: "sadfasdfas",
                    _id: null,
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: false,
                    tags: [],
                    relatedNotes: [],
                };

                updateNoteAPI(noteUpdated);
                await new Promise((r) => setTimeout(r, 50));

                const redux = store.getState();
                const outbox = (redux as RootStateWithOffline).offline.outbox;
                const notes = redux.notes.array;
                // one action to create and one action of edit
                expect(outbox.length).toEqual(2);
                expect(notes[0]).toMatchObject(noteUpdated);
            }
        );

        it(
            "Starting online, create a note, then edit offline\n" +
                "\t one action in the outbox\n" +
                "\t send a patch request to the backend\n",
            async () => {
                //tell redux that it is ONLINE
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: true,
                    },
                });
                const note = {
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: false,
                    tags: [],
                    relatedNotes: [],
                };
                const apiNote = {
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    _id: "61514289e3c2e405ab49db7e",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: false,
                    tags: [],
                    relatedNotes: [],
                };
                const mockRes = { status: 200, data: apiNote };
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mockRes);
                jest.spyOn(uuid, "v4").mockImplementation(
                    () => "75072f66-3b31-40f7-b3b7-5e46f4ea93fc"
                );
                createNoteAPI(note);
                await new Promise((r) => setTimeout(r, 50));

                // Switch to offline and update the note
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: false,
                    },
                });

                const noteUpdated = {
                    title: "UPDATED NAME",
                    text: "NEW TEXT",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    _id: "61514289e3c2e405ab49db7e",
                    user: "sadfasdfas",
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: false,
                    tags: ["new user tag"],
                    relatedNotes: [],
                };
                const mockRes2 = { status: 200, data: noteUpdated };
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mockRes2);

                // ACT
                updateNoteAPI(noteUpdated);

                const redux = store.getState();
                const notes = redux.notes.array;
                const outbox = (redux as RootStateWithOffline).offline.outbox;
                expect(outbox.length).toEqual(1);
                expect(axios).toHaveBeenCalledTimes(1);
                expect(notes[0]).toMatchObject(noteUpdated);
            }
        );
    });

    describe("Delete a note to backend", () => {
        it(
            "Create and delete a note while online\n" +
                "\t notes array is empty\n" +
                "\t two calls to axios\n",
            async () => {
                //tell redux that it is ONLINE
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: true,
                    },
                });
                const note = {
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                };
                const apiNote = {
                    user: "sadfasdfas",
                    _id: "61514289e3c2e405ab49db7e",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    title: "NEW NOTE TEST",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: true,
                    tags: [],
                    relatedNotes: [],
                };
                const mockRes = { status: 200, data: apiNote };
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mockRes);
                jest.spyOn(uuid, "v4").mockImplementation(
                    () => "75072f66-3b31-40f7-b3b7-5e46f4ea93fc"
                );

                // ACT
                createNoteAPI(note);
                await new Promise((r) => setTimeout(r, 50));

                const mockRes2 = { status: 200 };
                (axios as unknown as jest.Mock).mockResolvedValueOnce(mockRes2);

                deleteNoteAPI(apiNote);

                const notes = store.getState().notes.array;
                expect(axios).toHaveBeenCalledTimes(2);
                expect(notes.length).toBe(0);
            }
        );

        it(
            "Start offline, delete the note offline\n" +
                "\t two actions in the outbox\n" +
                "\t notes array is empty\n",
            async () => {
                //tell redux that it is OFFLINE
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: false,
                    },
                });

                // This is the note we are creating
                const note = {
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: false,
                    tags: [],
                    relatedNotes: [],
                };
                const storeNote = {
                    user: "sadfasdfas",
                    title: "NEW NOTE TEST",
                    _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                    _id: null,
                    text: null,
                    image: null,
                    reminderTime: null,
                    eventTime: null,
                    pinned: false,
                    tags: [],
                    relatedNotes: [],
                };
                jest.spyOn(uuid, "v4").mockImplementation(
                    () => "75072f66-3b31-40f7-b3b7-5e46f4ea93fc"
                );

                // ACT
                createNoteAPI(note);
                await new Promise((r) => setTimeout(r, 50));

                deleteNoteAPI(storeNote);
                await new Promise((r) => setTimeout(r, 50));

                const redux = store.getState();
                const notes = redux.notes.array;
                const outbox = (redux as RootStateWithOffline).offline.outbox;

                // Two actions in outbox, one create and one delete
                expect(outbox.length).toEqual(2);
                // The note is deleted
                expect(notes.length).toBe(0);
            }
        );
    });

    it(
        "Start online, create note, then delete it offline\n" +
            "\t one action in the outbox\n" +
            "\t notes array is empty\n",
        async () => {
            //tell redux that it is ONLINE
            store.dispatch({
                type: "Offline/STATUS_CHANGED",
                payload: {
                    online: true,
                },
            });
            const note = {
                user: "sadfasdfas",
                title: "NEW NOTE TEST",
                text: null,
                image: null,
                reminderTime: null,
                eventTime: null,
                pinned: false,
                tags: [],
                relatedNotes: [],
            };
            const apiNote = {
                user: "sadfasdfas",
                title: "NEW NOTE TEST",
                _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                _id: "61514289e3c2e405ab49db7e",
                text: null,
                image: null,
                reminderTime: null,
                eventTime: null,
                pinned: false,
                tags: [],
                relatedNotes: [],
            };
            const mockRes = { status: 200, data: apiNote };
            (axios as unknown as jest.Mock).mockResolvedValueOnce(mockRes);
            jest.spyOn(uuid, "v4").mockImplementation(
                () => "75072f66-3b31-40f7-b3b7-5e46f4ea93fc"
            );
            createNoteAPI(note);
            await new Promise((r) => setTimeout(r, 50));

            const mockRes2 = { status: 200 };
            (axios as unknown as jest.Mock).mockResolvedValueOnce(mockRes2);

            // //tell redux that it is OFFLINE
            store.dispatch({
                type: "Offline/STATUS_CHANGED",
                payload: {
                    online: false,
                },
            });
            deleteNoteAPI(apiNote);

            // Check note is deleted offline
            const redux = store.getState();
            const notes = redux.notes.array;
            const outbox = (redux as RootStateWithOffline).offline.outbox;

            expect(outbox.length).toEqual(1);
            expect(axios).toHaveBeenCalledTimes(1);
            expect(notes.length).toBe(0);
        }
    );
});
