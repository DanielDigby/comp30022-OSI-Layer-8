import React, { useEffect } from "react";
import styles from "./SettingsView.module.css";

import { useHistory } from "react-router-dom";
// Semantic UI button
import { Button, Segment } from "semantic-ui-react";

import ColourBlocks from "./ColourBlocks";
import FirstNameForm from "./Forms";
import PasswordForm from "./PasswordForm";
import ProfilePic from "./ProfilePic";
import { store } from "../../config/redux/store";

const SettingsView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateDashboard = () => navHistory.push("/dashboard");

    // Boot user out if not logged in
    useEffect(() => {
        if (!store.getState().user.account) navHistory.push("/login");
    });

    // api call
    return (
        <div className={styles.container}>
            {/* Top block of settings */}
            <Segment raised className={styles.block}>
                <div className={styles.heading}>
                    <h3>personal details</h3>
                </div>
                {/* All the different forms to enter, split 30% for forms 70% for profile pic */}
                <div className={styles.personal}>
                    <div className={styles.forms}>
                        <FirstNameForm />
                    </div>
                    <div>
                        <ProfilePic />
                    </div>
                </div>
                {/* Section for the password and confirmation forms */}
                <div className={styles.password}>
                    <PasswordForm />
                </div>
            </Segment>
            {/* Bottom block of settings */}
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
