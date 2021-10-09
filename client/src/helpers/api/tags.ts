import { store } from "../../config/redux/store";
import { updateUser } from "../../config/redux/userSlice";
import lodash from "lodash";

export const addTagAPI = (tag: string): void => {
    if (tag != "") {
        const user = lodash.cloneDeep(store.getState().user.account);
        user.tags.push(tag);
        store.dispatch(updateUser(user));
        console.log(user.tags);
    }
};

export const removeTagAPI = (tag: string): void => {
    const user = store.getState().user.account;
    const index = user.tags.indexOf(tag);
    user.tags.splice(index, 1);
    store.dispatch(updateUser(user));
};
