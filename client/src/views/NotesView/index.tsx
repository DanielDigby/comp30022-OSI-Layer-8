import React, { useEffect } from "react";
import globalStyles from "../../App.module.css";
import MenuBar from "./MenuBar";
import Profile from "../../components/Profile";
import styles from "./NotesView.module.css";
import NewNote from "./NewNote";
import { useHistory } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { DnD } from "./DnD";
import { loadPage } from "../../config/redux/noteSlice";
import { useDispatch } from "react-redux";

const NotesView = (): JSX.Element => {
    const history = useHistory();
    const dispatch = useDispatch();
    const navigateDashboard = () => history.push("/");

    useEffect(() => {
        dispatch(loadPage());
    });

    return (
        <div className={globalStyles.light}>
            <div className={styles.staticLeft}>
                <div>
                    <Profile onClick={navigateDashboard} />
                    <MenuBar />
                </div>
                <NewNote />
            </div>
            <div className={styles.main}>
                <div className={styles.containerRight}>
                    <SearchBar />
                </div>
                <DnD />
            </div>
        </div>
    );
};
export default NotesView;
