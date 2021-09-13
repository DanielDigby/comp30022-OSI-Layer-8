import React from "react";

// Semantic UI button
import globalStyles from "../../App.module.css";
import MenuItem from "./Menu";
import SearchBarItem from "./SearchBar";
import ProfileImage from "./ProfileImage";
import styles from "./NotesView.module.css";

const NotesView = (): JSX.Element => {
    // api call

    return (
        <div className={globalStyles.light}>
            <div className={styles.containerLeft}>
                <ProfileImage firstName="Sonja" lastName="Pedell" />
                <MenuItem />
            </div>
            <div className={styles.containerRight}>
                <SearchBarItem />
            </div>
        </div>
    );
};
export default NotesView;
