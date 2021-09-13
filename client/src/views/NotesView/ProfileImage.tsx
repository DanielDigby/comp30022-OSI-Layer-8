import React from "react";
import styles from "./ProfileImage.module.css";

// Semantic UI button
import { Image } from "semantic-ui-react";

interface Fullname {
    firstName: string;
    lastName: string;
}

const ProfileImage = (props: Fullname): JSX.Element => {
    // api call
    return (
        <div>
            <div className={styles.horizontal}>
                <div className={styles.image}>
                    <Image
                        src="https://cdn.theconversation.com/avatars/1193792/width238/file-20210106-15-zlm7jy.jpg"
                        circular
                    />
                </div>

                <h4 className={styles.text}>
                    {props.firstName + " " + props.lastName}
                </h4>
            </div>
        </div>
    );
};
export default ProfileImage;
