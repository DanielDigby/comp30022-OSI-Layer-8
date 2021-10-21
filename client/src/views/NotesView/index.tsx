import React, { useEffect } from "react";
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
        <div className={styles.container}>
            <div className={styles.header}>
                <Profile onClick={navigateDashboard} />
                <div className={styles.searchBar}>
                    <SearchBar />
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.staticLeft}>
                    <div>
                        <MenuBar />
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.notes}>
                        <NewNote />
                        <DnD />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NotesView;
