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

{
    /* SAMPLE NOTES DATA USED FOR DRAG AND DROP TESTING */
}

const testNotes = [
    { title: "col1", items: ["note1", "note2", "note3"] },
    { title: "col2", items: ["note4", "note5"] },
    { title: "col3", items: ["note7"] },
    { title: "col4", items: [] },
];

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
                {testNotes.map((col) => (
                    <div key={col.title} className={dndStyles.column}>
                        {col.items.map((item) => (
                            <div
                                draggable
                                key={item}
                                className={dndStyles.item}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Searchbar on top right corner */}
            <div className={styles.containerRight}>
                <SearchBarItem />
            </div>
        </div>
    );
};
export default NotesView;
