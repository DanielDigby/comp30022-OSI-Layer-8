import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

        updateUser: (state, action: PayloadAction<IUser>) => {
            state.account = action.payload;
        },
    },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
