import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USERS } from "../../interfaces/endpoints";
import { IUser } from "../../interfaces/user";

export interface UserState {
    account: IUser | null;
}

const initialState: UserState = {
    account: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
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

export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
