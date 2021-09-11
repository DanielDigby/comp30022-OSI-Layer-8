import React from "react";

// Semantic UI button
import globalStyles from "../../App.module.css";
import MenuItem from "./Menu";
import SearchBarItem from "./SearchBar";
import ProfileImage from "./ProfileImage";

const NotesView = (): JSX.Element => {
    // api call

    return (
        <div className={globalStyles.light}>
            <ProfileImage firstName="Sonja" lastName="Pedell" />
            <MenuItem />
            <SearchBarItem />
        </div>
    );
};
export default NotesView;
