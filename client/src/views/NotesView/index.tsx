import React from "react";

// Semantic UI button

import globalStyles from "../../App.module.css";
import MenuItem from "./Menu";
import SearchBarItem from "./SearchBar";
import ProfileImage from "./ProfileImage";
import styles from "./NotesView.module.css";

import { useHistory } from "react-router-dom";

{
    /* CSS used for the notes section */
}
import dndStyles from "./dragAndDrop.module.css";
import { DropdownItem } from "semantic-ui-react";

const NotesView = (): JSX.Element => {
    const history = useHistory();
    const navigateDashboard = () => history.push("/dashboard");

    // api call

    return (
        <div className={globalStyles.light}>
            {/* Sidebar with profile pic */}
            <div className={styles.containerLeft}>
                <ProfileImage
                    firstName="Sonja"
                    lastName="Pedell"
                    onClick={navigateDashboard}
                />
                <MenuItem />
            </div>

            {/* Main notes area? */}
            <div className={dndStyles.notesSection}>
                <div className={dndStyles.group}>
                    <div className={dndStyles.item}>
                        <div>
                            <p>note1</p>
                        </div>
                    </div>
                    <div className={dndStyles.item}>
                        <div>
                            <p>note2</p>
                        </div>
                    </div>
                </div>

                <div className={dndStyles.group}>
                    <div className={dndStyles.item}>
                        <div>
                            <p>note1</p>
                        </div>
                    </div>
                    <div className={dndStyles.item}>
                        <div>
                            <p>note2</p>
                        </div>
                    </div>
                </div>

                <div className={dndStyles.group}></div>
            </div>

            {/* Searchbar on top right corner */}
            <div className={styles.containerRight}>
                <SearchBarItem />
            </div>
        </div>
    );
};
export default NotesView;
