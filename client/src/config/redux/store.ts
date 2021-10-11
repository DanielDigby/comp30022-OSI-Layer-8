import axios, { AxiosRequestConfig } from "axios";
import { AnyAction, Reducer } from "redux";
import {
    combineReducers,
    configureStore,
    StoreEnhancer,
} from "@reduxjs/toolkit";
import { offline } from "@redux-offline/redux-offline";
import config from "@redux-offline/redux-offline/lib/defaults";

import userReducer from "./userSlice";
import noteReducer from "./noteSlice";
import { OfflineAction } from "@redux-offline/redux-offline/lib/types";

import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

// _action variable used for redux-offline
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const effect = (effect: AxiosRequestConfig, _action: OfflineAction) =>
    axios({ ...effect, withCredentials: true });

const combinedReducer = combineReducers({
    user: userReducer,
    notes: noteReducer,
});

export const RESET_BASE = "reset/all";
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === RESET_BASE) {
        state = {} as RootState;
    }
    return combinedReducer(state, action);
};

const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    enhancers: [offline({ ...config, effect }) as StoreEnhancer],
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export interface RootStateWithOffline extends RootState {
    offline: {
        busy: boolean;
        lastTransaction: number;
        online: boolean;
        outbox: Array<ReturnType<typeof effect>>;
        retryCount: number;
        retryScheduled: boolean;
    };
}
export type AppDispatch = typeof store.dispatch;
