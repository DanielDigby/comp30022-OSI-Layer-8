import { store } from "../../config/redux/store";
import { updateUser } from "../../config/redux/userSlice";

export const addTagAPI = (tag: string): void => {
    const user = store.getState().user.account;
    user.tags.push(tag);
    store.dispatch(updateUser(user));
};

export const removeTagAPI = (tag: string): void => {
    const user = store.getState().user.account;
    const index = user.tags.indexOf(tag);
    user.tags.splice(index, 1);
    store.dispatch(updateUser(user));
};
