import React from "react";
import styles from "./SettingsView.module.css";

import { useHistory } from "react-router-dom";
// Semantic UI button
import { Button, Segment } from "semantic-ui-react";

import ColourBlocks from "./ColourBlocks";

const SettingsView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateDashboard = () => navHistory.push("/dashboard");

    // api call
    return (
        <div className={styles.container}>
            <Segment raised className={styles.block}>
                Personal Details
                <div>hello</div>
                <div>hello</div>
                <div>hello</div>
            </Segment>

            <Segment raised className={styles.block}>
                <div className={styles.heading}>
                    <h3>color schemes</h3>
                </div>
                <ColourBlocks />
            </Segment>

            <div className={styles.footer}>
                <Button positive onClick={() => navigateDashboard()}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default SettingsView;
