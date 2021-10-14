import React from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import { capitalize } from "lodash";
// Semantic UI button
import { Image } from "semantic-ui-react";
import placeholder from "../../assets/placeholder.png";

interface Fullname {
    onClick?: () => void;
}

const ProfileImage = (props: Fullname): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.account);
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
                        src={user.profilePic ? user.profilePic : placeholder}
                        circular
                    />
                </div>
                <div className={styles.text}>
                    {capitalize(user.firstName) +
                        " " +
                        capitalize(user.lastName)}
                </div>
            </div>
        </div>
    );
};
export default ProfileImage;
