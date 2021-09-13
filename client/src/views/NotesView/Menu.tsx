import React from "react";
import styles from "./NotesView.module.css";
import globalStyles from "../../App.module.css";

// Semantic UI button
import { Menu, Icon } from "semantic-ui-react";

const MenuItem = (): JSX.Element => {
    // api call

    return (
        <div className={styles.sideContainer}>
            <div>
                <Icon name="tag" size="large" />
            </div>
            <div className={`${globalStyles.sideMenu} ${styles.menu}`}>
                <Menu fluid vertical tabular>
                    <Menu.Item name="Pinned" />
                    <Menu.Item name="Events" />
                    <Menu.Item name="Contacts" />
                    <Menu.Item name="Links" />
                </Menu>
                <Icon name="plus" />
            </div>
            <div>
                <Icon name="cog" size="large" />
            </div>
        </div>
    );
};
export default MenuItem;
