import React from "react";
import globalStyles from "../../App.module.css";
import MenuItem from "./Menu";
import Profile from "../../components/Profile";
import styles from "./NotesView.module.css";
import NewNote from "./NewNote";
import { Search } from "semantic-ui-react";
import { INote } from "../../interfaces/note";
import { useHistory } from "react-router-dom";
import { checkAuthAPI } from "../../helpers/api/users";
import { useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import { searchNotes } from "../../helpers/utils/search";
import { DnD, ColumnDict } from "./DnD";
import { mapNotesToColumns } from "../../helpers/utils/columns";

type NotesState = {
    loading: boolean;
    notes: Array<INote>;
    columns: ColumnDict;
    value: string | undefined;
};

type Action = {
    type: string;
    columns?: ColumnDict;
    query?: string;
    notes?: Array<INote>;
    selection?: string;
};

const NotesView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/");
    checkAuthAPI(history);

    // get redux state
    const store = useSelector((state: RootState) => state);
    const source = store.notes.array;

    // set component state based on user notes, reducer and actions are passed
    // down to child components
    // reducer is used to combine multiple sources of state changes into one
    // manageable ruleset (filtering/searching/crud)
    //
    // code for reducer and search bar state management sourced from semantic ui
    // docs here:
    // https://react.semantic-ui.com/modules/search/
    const initialState: NotesState = {
        loading: false,
        notes: [],
        columns: mapNotesToColumns(source),
        value: "",
    };
    const notesReducer = (state: NotesState, action: Action): NotesState => {
        switch (action.type) {
            case "CLEAN_QUERY":
                return initialState;

            case "START_SEARCH":
                return { ...state, loading: true, value: action.query };

            case "FINISH_SEARCH":
                if (action.notes)
                    return {
                        ...state,
                        loading: false,
                        notes: action.notes,
                        columns: mapNotesToColumns(action.notes),
                    };
                else return { ...state };

            case "UPDATE_SELECTION":
                return { ...state, value: action.selection };

            case "UPDATE_COLUMNS":
                if (action.columns)
                    return {
                        ...state,
                        columns: action.columns,
                    };
                else return { ...state };

            default:
                throw new Error();
        }
    };
    const [state, dispatch] = React.useReducer(notesReducer, initialState);
    const updateColumns = (columns: ColumnDict) => {
        dispatch({ type: "UPDATE_COLUMNS", columns: columns });
    };

    return (
        <div className={globalStyles.light}>
            <div className={styles.staticLeft}>
                <div>
                    <Profile onClick={navigateDashboard} />
                    <MenuItem />
                </div>
                <NewNote />
            </div>
            <div className={styles.main}>
                <div className={styles.containerRight}>
                    <SearchBar {...{ state, source, dispatch }} />
                </div>
                <DnD updateColumns={updateColumns} columns={state.columns} />
            </div>
        </div>
    );
};
export default NotesView;

// Search bar component handles the logic for applying the results of search by
// using the dispatch function passed in as prop
type SearchBarProps = {
    state: NotesState;
    source: Array<INote>;
    dispatch: React.Dispatch<Action>;
};
function SearchBar({ state, source, dispatch }: SearchBarProps): JSX.Element {
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
}
