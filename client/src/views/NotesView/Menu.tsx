import React, { useState } from "react";
import styles from "./NotesView.module.css";
import globalStyles from "../../App.module.css";

import { useHistory } from "react-router-dom";

// Semantic UI button
import { Menu, Icon, Input } from "semantic-ui-react";

const MenuItem = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateSettings = () => navHistory.push("/settings");
    const [show, setShow] = useState(false);

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
            </div>
            <div>
                <Icon name="plus" size="large" onClick={() => setShow(!show)} />
            </div>
            <div>{show ? <Input placeholder="New Tag..." /> : null}</div>

            <div>
                <Icon
                    name="cog"
                    size="large"
                    onClick={() => navigateSettings()}
                />
            </div>
        </div>
    );
};
export default MenuItem;
