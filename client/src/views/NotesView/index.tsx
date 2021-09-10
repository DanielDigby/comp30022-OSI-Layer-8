import React from "react";
import styles from "./NotesView.module.css";

// Semantic UI button
import { Button, Menu } from "semantic-ui-react";

import { useHistory } from "react-router-dom";

const NotesView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateDashboard = () => navHistory.push("/dashboard");

    // api call
    return (
        <div>
            <div className={styles.container}>
                <Menu secondary vertical>
                    <Menu.Item name="Pinned" />
                    <Menu.Item name="Events" />
                    <Menu.Item name="Contacts" />
                </Menu>

                <div className={styles.footer}>
                    <Button size="medium" onClick={() => navigateDashboard()}>
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotesView;
