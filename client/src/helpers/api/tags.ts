import { store } from "../../config/redux/store";
import { IUser } from "../../interfaces/user";
import { updateUser } from "../../config/redux/userSlice";

export const addTagAPI = (user: IUser, tag: string): void => {
    user.tags.push(tag);
    store.dispatch(updateUser(user));
};

export const removeTagAPI = (user: IUser, tag: string): void => {
    const index = user.tags.indexOf(tag);
    user.tags.splice(index, 1);
    store.dispatch(updateUser(user));
};
