import React from "react";
import styles from "./NotesView.module.css";

// Semantic UI button
import { Image } from "semantic-ui-react";

interface Fullname {
    firstName: string;
    lastName: string;
}

const ProfileImage = (props: Fullname): JSX.Element => {
    // api call
    return (
        <div className={styles.container}>
            <div>
                <Image
                    src="https://cdn.theconversation.com/avatars/1193792/width238/file-20210106-15-zlm7jy.jpg"
                    className={styles.image}
                    circular
                />
            </div>

            <div className={styles.name}>
                <h4>{props.firstName + props.lastName}</h4>
            </div>
        </div>
    );
};
export default ProfileImage;
