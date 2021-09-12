import React from "react";
import styles from "./NotesView.module.css";
import globalStyles from "../../App.module.css";

// Semantic UI button
import { Menu } from "semantic-ui-react";

const MenuItem = (): JSX.Element => {
    // api call

    return (
        <div>
            <div></div>
            <div className={`${globalStyles.sideMenu} ${styles.menu}`}>
                <Menu fluid vertical tabular>
                    <Menu.Item name="Pinned" />
                    <Menu.Item name="Events" />
                    <Menu.Item name="Contacts" />
                    <Menu.Item name="Settings" />
                </Menu>
            </div>
        </div>
    );
};
export default MenuItem;
