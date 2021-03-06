import axios from "axios";
import { SemanticCOLORS } from "semantic-ui-react";
import { storage } from "../../config/firebase/config";
import { useHistory } from "react-router";
import { cloneDeep } from "lodash";
import { IUser, INewUser } from "../../interfaces/user";
import { setUser, updateUser } from "../../config/redux/userSlice";
import { setNotes } from "../../config/redux/noteSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { RESET_STATE as RESET_OFFLINE } from "@redux-offline/redux-offline/lib/constants";
import {
    store,
    RootStateWithOffline,
    RESET_BASE,
} from "../../config/redux/store";
import {
    LOG_IN,
    LOG_OUT,
    NOTES,
    REGISTER,
    USERS,
    UPDATE_PASSWORD,
} from "../../interfaces/endpoints";

// post username password to backend then load notes and populate redux
// reject with unauthorized error when credentials are incorrect
export interface Credentials {
    email: string;
    password: string;
}

export const logInAPI = async (credentials: Credentials): Promise<void> => {
    const authRes = await axios.post(LOG_IN, credentials, {
        withCredentials: true,
    });
    const user = authRes.data;

    if (user) {
        store.dispatch(setUser(user));

        // load notes
        const notesRes = await axios.get(NOTES, { withCredentials: true });
        const notes = notesRes.data;
        if (notes) store.dispatch(setNotes(notes));
        else throw new Error(notesRes.statusText);
    } else throw new Error(authRes.statusText);
};

// post log out to server
// clear redux store and redux offline
// rejects with Non Empty Outbox if there are unsaved http requests
// rejects with Unauthorized when no user jwt
export const logOutAPI = async (
    history: ReturnType<typeof useHistory>
): Promise<void> => {
    history.replace("/login");
    const outbox = (store.getState() as RootStateWithOffline).offline.outbox;
    if (outbox.length !== 0) throw new Error("Non Empty Outbox");

    const res = await axios.get(LOG_OUT, { withCredentials: true });

    if (res.status == 200) {
        store.dispatch({ type: RESET_OFFLINE });
        store.dispatch({ type: RESET_BASE });
    } else throw new Error(res.statusText);
};

// post new user to backend
// and set returned user in redux
// rejects with Password error on non matching passwords

export const registerAPI = async (newUser: INewUser): Promise<void> => {
    const res = await axios.post(REGISTER, newUser, {
        withCredentials: true,
    });
    const user = res.data;
    if (user) {
        store.dispatch(setUser(user));
    } else throw new Error(res.statusText);
};

export const updateUserAPI = async (updatedUser: IUser): Promise<void> => {
    if (!store.getState().offline.online)
        throw new Error("Must be online to update user details");

    const res = await axios.put(USERS + "/" + updatedUser._id, updatedUser, {
        withCredentials: true,
    });
    const user = res.data;
    if (user && res.status == 200) {
        store.dispatch(updateUser(user));
    } else throw new Error(res.statusText);
};

export const updatePasswordAPI = async (
    password1: string,
    password2: string,
    user: IUser
): Promise<void> => {
    if (!store.getState().offline.online)
        throw new Error("Must be online to update user details");

    const res = await axios.put(
        UPDATE_PASSWORD + "/" + user._id,
        {
            password1: password1,
            password2: password2,
        },
        {
            withCredentials: true,
        }
    );
    if (res.status !== 200) throw new Error(res.statusText);
};

// Boot user out if not logged in
export const checkAuthAPI = (): boolean => {
    if (store.getState().user.account == null) return false;
    else return true;
};

export const updateProfilePicAPI = async (
    fileList: FileList | null
): Promise<void> => {
    const user = store.getState().user.account;

    if (!fileList) throw new Error("No file selected");
    if (fileList[0]) {
        const file = fileList[0];
        const fileType = file["type"];
        const validImageTypes = ["image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
            const temp = cloneDeep(user);

            const fileRef = ref(storage, `images/${file.name}`);
            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);

            if (!url) throw new Error("Failed upload");

            temp.profilePic = url;
            updateUserAPI(temp);
        }
    }
};

export const getColourScheme = (): SemanticCOLORS => {
    if (store.getState().user.account?.colourScheme)
        return store.getState().user.account.colourScheme;
    else return "orange";
};
