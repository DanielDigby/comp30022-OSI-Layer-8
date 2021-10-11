import React from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";
import { capitalize } from "lodash";
// Semantic UI button
import { Image } from "semantic-ui-react";
import placeholder from "./placeholder.png";

interface Fullname {
    onClick?: () => void;
}

const ProfileImage = (props: Fullname): JSX.Element => {
    const store = useSelector((state: RootState) => state);
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
                    <Image src={placeholder} circular />
                </div>
                <div className={styles.text}>
                    {capitalize(store.user.account.firstName) +
                        " " +
                        capitalize(store.user.account.lastName)}
                </div>
            </div>
        </div>
    );
};
export default ProfileImage;
