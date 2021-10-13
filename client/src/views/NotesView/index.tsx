import React from "react";
import globalStyles from "../../App.module.css";
import MenuBar from "./MenuBar";
import Profile from "../../components/Profile";
import styles from "./NotesView.module.css";
import NewNote from "./NewNote";
import { useHistory } from "react-router-dom";
import { checkAuthAPI } from "../../helpers/api/users";
import { SearchBar } from "./SearchBar";
import { DnD } from "./DnD";

const NotesView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/");
    checkAuthAPI(history);

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
