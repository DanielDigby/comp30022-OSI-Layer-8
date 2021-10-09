import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USERS } from "../../interfaces/endpoints";
import { IUser } from "../../interfaces/user";

export interface UserState {
    account: IUser | null;
    isNewLogin: boolean;
}

const initialState: UserState = {
    account: null,
    isNewLogin: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        toggleIsNewLogin: (state) => {
            state.isNewLogin = !state.isNewLogin;
        },

        setUser: (state, action: PayloadAction<IUser>) => {
            state.account = action.payload;
        },

        clearUser: (state) => {
            state.account = null;
        },

        // update user locally and post changes to backend
        updateUser: {
            reducer: (state, action: PayloadAction<IUser>) => {
                state.account = action.payload;
            },
            prepare: (user: IUser) => {
                return {
                    payload: user,
                    meta: {
                        offline: {
                            effect: {
                                url: USERS + "/" + user._id,
                                method: "PUT",
                            },
                        },
                    },
                };
            },
        },
    },
});

export const { toggleIsNewLogin, setUser, clearUser, updateUser } =
    userSlice.actions;

export default userSlice.reducer;
