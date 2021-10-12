import React from "react";
import { INote } from "../../../interfaces/note";
import { Search } from "semantic-ui-react";
import { searchNotes } from "../../../helpers/utils/search";
import { NotesState, Action } from "../index";

// Search bar component handles the logic for applying the results of search by
// using the dispatch function passed in as prop
type SearchBarProps = {
    state: NotesState;
    source: Array<INote>;
    dispatch: React.Dispatch<Action>;
};
export const SearchBar = ({
    state,
    source,
    dispatch,
}: SearchBarProps): JSX.Element => {
    const { loading, notes, value } = state;

    // manage search animation, set zero for typescript
    const timeoutRef = React.useRef(
        setTimeout(() => {
            return;
        }, 0)
    );

    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current);
        dispatch({ type: "START_SEARCH", query: data.value });

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: "CLEAN_QUERY" });
                return;
            }

            dispatch({
                type: "FINISH_SEARCH",
                notes: searchNotes(source, data.value),
            });
        }, 300);
    }, []);

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <Search
            loading={loading}
            onResultSelect={(e, data) =>
                dispatch({
                    type: "UPDATE_SELECTION",
                    selection: data.result.title,
                })
            }
            onSearchChange={handleSearchChange}
            notes={notes}
            value={value}
        />
    );
};
