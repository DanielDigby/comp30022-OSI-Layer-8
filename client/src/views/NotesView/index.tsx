import React from "react";

// Semantic UI button

import globalStyles from "../../App.module.css";
import MenuItem from "./Menu";
import SearchBarItem from "./SearchBar";
import ProfileImage from "./ProfileImage";
import styles from "./NotesView.module.css";

import { useHistory } from "react-router-dom";

const NotesView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");

    // api call

    return (
        <div className={globalStyles.light}>
            <div className={styles.containerLeft}>
                <ProfileImage
                    firstName="Sonja"
                    lastName="Pedell"
                    onClick={navigateDashboard}
                />
                <MenuItem />
            </div>
            <div className={styles.containerRight}>
                <SearchBarItem />
            </div>
        </div>
    );
};
export default NotesView;
