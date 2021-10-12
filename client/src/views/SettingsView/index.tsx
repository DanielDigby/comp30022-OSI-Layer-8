import React from "react";
import styles from "./SettingsView.module.css";
import { logOutAPI } from "../../helpers/api/users";
import Profile from "../../components/Profile";
import { useHistory } from "react-router-dom";
// Semantic UI button
import globalStyles from "../../App.module.css";
import { Segment, Icon } from "semantic-ui-react";

import ColourBlocks from "./ColourBlocks";
import FirstNameForm from "./Forms";
import PasswordForm from "./PasswordForm";
import ProfilePic from "./ProfilePic";
import { checkAuthAPI } from "../../helpers/api/users";

const SettingsView = (): JSX.Element => {
    const history = useHistory();
    const back = () => history.goBack();

    checkAuthAPI(history);

    // api call
    return (
        <div className={globalStyles.light}>
            <div className={styles.container}>
                <div className={styles.leftBanner}>
                    <div>
                        <Profile />
                        <div
                            className={styles.signOut}
                            onClick={async () => await logOutAPI(history)}
                        >
                            <Icon name="sign out" size="big" color="grey" />
                            Sign out
                        </div>
                    </div>
                    <div className={styles.backButton}>
                        <Icon
                            name="arrow left"
                            size="big"
                            color="grey"
                            onClick={back}
                        />
                    </div>
                </div>
                {/* Top block of settings */}
                <div className={styles.main}>
                    <Segment raised className={styles.block}>
                        <div className={styles.heading}>
                            <h3>Personal details</h3>
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
                        {false && (
                            <div className={styles.password}>
                                <PasswordForm />
                            </div>
                        )}
                    </Segment>
                    {/* Bottom block of settings */}
                    {/* TOGGLE OFF FALSE TO REENABLE FEATURE WHEN READY TO WORK ON COLOURSCHEMES */}
                    {false && (
                        <Segment raised className={styles.block}>
                            <div className={styles.heading}>
                                <h3>color schemes</h3>
                            </div>
                            <ColourBlocks />
                        </Segment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
