import { configureStore, StoreEnhancer } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import noteReducer from "./noteSlice";
import { offline } from "@redux-offline/redux-offline";
import config from "@redux-offline/redux-offline/lib/defaults";

export const store = configureStore({
    reducer: {
        user: userReducer,
        notes: noteReducer,
    },
    enhancers: [offline(config) as StoreEnhancer],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
