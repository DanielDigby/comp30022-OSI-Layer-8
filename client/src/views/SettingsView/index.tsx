import React, { useState } from "react";
import styles from "./SettingsView.module.css";
import { logOutAPI } from "../../helpers/api/users";
import Profile from "../../components/Profile";
import { useHistory } from "react-router-dom";
// Semantic UI button
import globalStyles from "../../App.module.css";
import { Segment, Icon, Image } from "semantic-ui-react";

import ColourBlocks from "./ColourBlocks";

import { checkAuthAPI } from "../../helpers/api/users";

const SettingsView = (): JSX.Element => {
    const history = useHistory();
    const back = () => history.goBack();
    const logOut = async () => await logOutAPI(history);

    checkAuthAPI(history);

    // api call
    return (
        <div className={globalStyles.light}>
            <div className={styles.container}>
                <div className={styles.leftBanner}>
                    <div>
                        <Profile />
                        <div className={styles.signOut} onClick={logOut}>
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
                                <UserDetails />
                            </div>
                            <ProfilePic />
                        </div>
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

const UserDetails = (): JSX.Element => {
    const firstNameStateVariable = useState("first name");
    const firstName = firstNameStateVariable[0];
    const lastNameStateVariable = useState("last name");
    const lastName = lastNameStateVariable[0];
    const emailStateVariable = useState("email");
    const email = emailStateVariable[0];
    const password = "*********";

    return (
        <div>
            <div className={styles.formheading}>
                <div className={styles.formtitle}>
                    <div className={styles.field}>
                        {firstName}
                        <Icon
                            size="small"
                            name="pencil alternate"
                            color="grey"
                        />{" "}
                    </div>
                    <div className={styles.field}>
                        {lastName}
                        <Icon
                            size="small"
                            name="pencil alternate"
                            color="grey"
                        />
                    </div>
                    <div className={styles.field}>
                        {email}
                        <Icon
                            size="small"
                            name="pencil alternate"
                            color="grey"
                        />
                    </div>
                    <div className={styles.field}>
                        {password}
                        <Icon
                            size="small"
                            name="pencil alternate"
                            color="grey"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfilePic = (): JSX.Element => {
    return (
        <div className={styles.profilePic}>
            <div className={styles.profileTitle}>
                profile image
                <Icon
                    size="small"
                    name="pencil alternate"
                    color="grey"
                    style={{ marginLeft: "60px" }}
                />{" "}
            </div>

            <div className={styles.image}>
                <Image
                    src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                    size="medium"
                    rounded
                />
            </div>
        </div>
    );
};
