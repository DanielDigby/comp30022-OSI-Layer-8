import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/user";

export interface UserState {
    user: IUser | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        update: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
