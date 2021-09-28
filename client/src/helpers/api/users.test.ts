import { logInAPI, logOutAPI, registerAPI } from "./users";
import { RESET_STATE as RESET_OFFLINE } from "@redux-offline/redux-offline/lib/constants";
import { store, RESET_BASE } from "../../config/redux/store";
import axios from "axios";

jest.mock("axios");
jest.mock("uuid");

describe("Users API Helpers", () => {
    afterEach(() => {
        store.dispatch({ type: RESET_OFFLINE });
        store.dispatch({ type: RESET_BASE });
    });
    describe("Log in user", () => {
        it(
            "When valid user credentials are passed it should:\n" +
                "\t set the user in redux store\n" +
                "\t attempt to load notes in redux store\n",
            async () => {
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: true,
                    },
                });

                const apiUser = {
                    email: "test@email.com",
                    firstName: "firstName",
                    lastName: "lastName",
                    password: "redacted",
                    profilePic: "somepicurl",
                    colourScheme: "PLACEHOLDER",
                    tags: [],
                };
                const userNotes = [
                    {
                        title: "NEW NOTE TEST",
                        _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                        tags: [],
                        relatedNotes: [],
                        _id: "61514289e3c2e405ab49db7e",
                    },
                    {
                        title: "SECOND NOTE",
                        _clientId: "75072f77-3b31-40f7-b3b7-5e46f4ea9abc",
                        tags: [],
                        relatedNotes: [],
                        _id: "61514289e3c2e405ab4abcde",
                    },
                ];
                // mock the axios return user and notes
                const mockRes = { status: 200, data: apiUser };
                (axios.post as unknown as jest.Mock).mockResolvedValueOnce(
                    mockRes
                );
                const mockRes2 = { status: 200, data: userNotes };
                (axios.get as unknown as jest.Mock).mockResolvedValueOnce(
                    mockRes2
                );

                await logInAPI({
                    email: "test@email.com",
                    password: "password1",
                });

                // wait for outbox to clear
                await new Promise((r) => setTimeout(r, 50));
                const user = store.getState().user.account;
                const notes = store.getState().notes.array;
                expect(axios.post).toHaveBeenCalledTimes(1);
                expect(axios.get).toHaveBeenCalledTimes(1);
                expect(user).toMatchObject(apiUser);
                expect(notes).toEqual(userNotes);
            }
        );
    });

    describe("Log out user", () => {
        it(
            "When a user is logged in, and the outbox is empty:\n" +
                "\t clear redux offline\n" +
                "\t clear the redux store\n",
            async () => {
                store.dispatch({
                    type: "Offline/STATUS_CHANGED",
                    payload: {
                        online: true,
                    },
                });

                const apiUser = {
                    email: "test@email.com",
                    firstName: "firstName",
                    lastName: "lastName",
                    password: "redacted",
                    profilePic: "somepicurl",
                    colourScheme: "PLACEHOLDER",
                    tags: [],
                };
                const userNotes = [
                    {
                        title: "NEW NOTE TEST",
                        _clientId: "75072f66-3b31-40f7-b3b7-5e46f4ea93fc",
                        tags: [],
                        relatedNotes: [],
                        _id: "61514289e3c2e405ab49db7e",
                    },
                    {
                        title: "SECOND NOTE",
                        _clientId: "75072f77-3b31-40f7-b3b7-5e46f4ea9abc",
                        tags: [],
                        relatedNotes: [],
                        _id: "61514289e3c2e405ab4abcde",
                    },
                ];
                const mockRes = { status: 200, data: apiUser };
                (axios.post as unknown as jest.Mock).mockResolvedValueOnce(
                    mockRes
                );
                const mockRes2 = { status: 200, data: userNotes };
                (axios.get as unknown as jest.Mock).mockResolvedValueOnce(
                    mockRes2
                );
                await logInAPI({
                    email: "test@email.com",
                    password: "password1",
                });

                const mockRes3 = { status: 200 };
                (axios.get as unknown as jest.Mock).mockResolvedValueOnce(
                    mockRes3
                );

                await logOutAPI();

                const user = store.getState().user.account;
                const notes = store.getState().notes.array;
                expect(axios.get).toHaveBeenCalledTimes(2);
                expect(user).toBe(null);
                expect(notes).toEqual([]);
            }
        );
    });

    describe("Register user", () => {
        it(
            "When a valid newUser is posted expect:\n" +
                "\t true\n" +
                "\t set created user in redux store\n",
            async () => {
                const newUser = {
                    email: "test@email.com",
                    firstName: "firstName",
                    lastName: "lastName",
                    password1: "password",
                    password2: "password",
                    profilePic: "someImgUrl",
                };
                const apiUser = {
                    email: "test@email.com",
                    firstName: "firstName",
                    lastName: "lastName",
                    password: "redacted",
                    profilePic: "someImgUrl",
                    colourScheme: "PLACEHOLDER",
                    tags: [],
                };
                const mockRes = { status: 200, data: apiUser };
                (axios.post as unknown as jest.Mock).mockResolvedValueOnce(
                    mockRes
                );

                await registerAPI(newUser);
                await new Promise((r) => setTimeout(r, 50));
                const user = store.getState().user.account;
                const notes = store.getState().notes.array;
                expect(axios.post).toHaveBeenCalledTimes(1);
                expect(user).toMatchObject(apiUser);
                expect(notes).toEqual([]);
            }
        );

        it(
            "When non matching passwords are posted expect:\n" +
                "\t false\n" +
                "\t promise reject with password error\n" +
                "\t no user to have been set\n",
            async () => {
                const newUser = {
                    email: "test@email.com",
                    firstName: "firstName",
                    lastName: "lastName",
                    password1: "password",
                    password2: "nonMatching",
                    profilePic: "someImgUrl",
                };
                const mockRes = { status: 400, statusText: "Password Error" };
                (axios.post as unknown as jest.Mock).mockResolvedValueOnce(
                    mockRes
                );

                expect(async () => {
                    await registerAPI(newUser);
                }).rejects.toEqual(Error("Password Error"));

                await new Promise((r) => setTimeout(r, 50));
                const user = store.getState().user.account;
                const notes = store.getState().notes.array;
                expect(axios.post).toHaveBeenCalledTimes(1);
                expect(user).toBe(null);
                expect(notes).toEqual([]);
            }
        );
    });
});
