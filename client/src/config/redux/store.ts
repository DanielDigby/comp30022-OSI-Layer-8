import axios, { AxiosRequestConfig } from "axios";
import { configureStore, StoreEnhancer } from "@reduxjs/toolkit";
import { offline } from "@redux-offline/redux-offline";
import config from "@redux-offline/redux-offline/lib/defaults";

import userReducer from "./userSlice";
import noteReducer from "./noteSlice";
import { OfflineAction } from "@redux-offline/redux-offline/lib/types";

// _action variable used for redux-offline
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const effect = (effect: AxiosRequestConfig, _action: OfflineAction) =>
    axios({ ...effect, withCredentials: true });

export const store = configureStore({
    reducer: {
        user: userReducer,
        notes: noteReducer,
    },
    enhancers: [offline({ ...config, effect }) as StoreEnhancer],
});

export type RootState = ReturnType<typeof store.getState>;
export interface RootStateWithOffline extends RootState {
    offline: {
        busy: boolean;
        lastTransaction: number;
        online: boolean;
        outbox: [ReturnType<typeof effect>];
        retryCount: number;
        retryScheduled: false;
        netInfo: undefined;
    };
}
export type AppDispatch = typeof store.dispatch;
