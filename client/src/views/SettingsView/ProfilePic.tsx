import React from "react";
import styles from "./ProfilePic.module.css";

// Semantic UI button
import { Image, Icon } from "semantic-ui-react";

const ProfilePic = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h3>Profile picture</h3>
                <Icon classNamesize="small" name="edit outline" />
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

export default ProfilePic;
