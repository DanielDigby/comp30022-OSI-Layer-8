/* eslint-disable security/detect-object-injection */
import React from "react";
import { v4 as uuid } from "uuid";
import _ from "lodash";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import { INote } from "../../interfaces/note";
import { DnD, ColumnDict } from "./DnD";
import globalStyles from "../../App.module.css";
import MenuItem from "./Menu";
import Profile from "../../components/Profile";
import styles from "./NotesView.module.css";
import NewNote from "./NewNote";
import { useHistory } from "react-router-dom";
import { checkAuthAPI } from "../../helpers/api/users";
import { useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import { searchNotes } from "../../helpers/utils/search";

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

const placeholderColumn = {
    [uuid()]: {
        name: "col1",
        items: new Array<INote>(),
    },
};

const mapNotesToColumns = (notes: Array<INote>): ColumnDict => {
    const temp = _.cloneDeep(notes);
    const id1 = uuid();
    const id2 = uuid();
    const id3 = uuid();
    const newDict = {
        [id1]: {
            name: "col1",
            items: new Array<INote>(),
        },
        [id2]: {
            name: "col2",
            items: new Array<INote>(),
        },
        [id3]: {
            name: "col3",
            items: new Array<INote>(),
        },
    };

    while (temp.length !== 0) {
        if (temp.length % 3 === 0) {
            const note = temp.shift();
            if (note) newDict[id3].items.push(note);
        }
        if (temp.length % 2 === 0) {
            const note = temp.shift();
            if (note) newDict[id2].items.push(note);
        } else {
            const note = temp.shift();
            if (note) newDict[id1].items.push(note);
        }
    }
    return newDict;
};

const NotesView = (): JSX.Element => {
    const history = useHistory();
    checkAuthAPI(history);
    const store = useSelector((state: RootState) => state);
    const source = store.notes.array;
    const initialState: NotesState = {
        loading: false,
        notes: [],
        columns: mapNotesToColumns(source),
        value: "",
    };
    const notesReducer = (state: NotesState, action: Action): NotesState => {
        switch (action.type) {
            case "UPDATE_COLUMNS":
                return {
                    ...state,
                    columns: action.columns
                        ? action.columns
                        : placeholderColumn,
                };
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
                return { ...state };
            case "UPDATE_SELECTION":
                return { ...state, value: action.selection };

            default:
                throw new Error();
        }
    };

    const [state, dispatch] = React.useReducer(notesReducer, initialState);
    const updateColumns = (columns: ColumnDict) => {
        dispatch({ type: "UPDATE_COLUMNS", columns: columns });
    };
    const navigateDashboard = () => history.push("/");

    return (
        <div className={globalStyles.light}>
            {/* Sidebar with profile pic */}
            <div className={styles.staticLeft}>
                <div>
                    <Profile onClick={navigateDashboard} />

                    <MenuItem />
                </div>
                <NewNote />
            </div>
            {/* Main notes area 
            Pass in:
            the updateColumns state function defined on line 110
            the columns data structure, initially set to initialColumns
            */}
            <div className={styles.main}>
                {/* Searchbar on top right corner */}
                <div className={styles.containerRight}>
                    <SearchBar {...{ state, source, dispatch }} />
                </div>
                <DnD updateColumns={updateColumns} columns={state.columns} />
            </div>
        </div>
    );
};
export default NotesView;

type SearchBarProps = {
    state: NotesState;
    source: Array<INote>;
    dispatch: React.Dispatch<Action>;
};

function SearchBar({ state, source, dispatch }: SearchBarProps): JSX.Element {
    const { loading, notes, value } = state;

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
