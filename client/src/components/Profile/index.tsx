import React from "react";
import styles from "./Profile.module.css";

// Semantic UI button
import { Image } from "semantic-ui-react";

interface Fullname {
    firstName: string;
    lastName: string;
    onClick?: () => void;
}

const ProfileImage = (props: Fullname): JSX.Element => {
    let handleClick: () => void;
    if (props.onClick) {
        handleClick = props.onClick;
    } else {
        handleClick = () => {
            return;
        };
    }
    // api call
    return (
        <div onClick={() => handleClick()}>
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
