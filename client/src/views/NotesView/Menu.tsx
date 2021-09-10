import React from "react";
import styles from "./NotesView.module.css";
import globalStyles from "../../App.module.css";

// Semantic UI button
import { Menu } from "semantic-ui-react";

import ProfileImage from "./ProfileImage";

const MenuItem = (): JSX.Element => {
    // api call

    return (
        <div>
            <div className={`${globalStyles.sideMenu} ${styles.menu}`}>
                <ProfileImage firstName="Sonja" lastName="Pedell" />

                <Menu fluid vertical tabular>
                    <Menu.Item name="Pinned" />
                    <Menu.Item name="Events" />
                    <Menu.Item name="Contacts" />
                    <Menu.Item name="Links" />
                </Menu>
            </div>
        </div>
    );
};
export default MenuItem;
