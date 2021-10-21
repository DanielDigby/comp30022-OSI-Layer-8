import React from "react";
import styles from "./SearchBar.module.css";
import { Search } from "semantic-ui-react";
import { RootState } from "../../../config/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
    clearSearch,
    startSearch,
    finishSearch,
} from "../../../config/redux/noteSlice";

// Search bar component handles the logic for applying the results of search by
// using the dispatch function to set redux state
export const SearchBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const store = useSelector((state: RootState) => state);
    const loading = store.notes.searchLoading;
    const value = store.notes.search;

    // manage search animation, set zero for typescript
    const timeoutRef = React.useRef(
        setTimeout(() => {
            return;
        }, 0)
    );

    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current);

        dispatch(startSearch(data.value));

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) return dispatch(clearSearch());

            dispatch(finishSearch(data.value));
        }, 300);
    }, []);

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <Search
            className={styles.searchBar}
            loading={loading}
            onSearchChange={handleSearchChange}
            value={value}
            showNoResults={false}
        />
    );
};
