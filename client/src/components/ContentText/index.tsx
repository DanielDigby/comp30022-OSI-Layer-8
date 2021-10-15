import React from "react";
import "semantic-ui-css/semantic.min.css";
import styles from "./ContentText.module.css";

type TextProps = {
    text: string;
};

const Text = ({ text }: TextProps): JSX.Element => {
    return <div className={styles.content}>{text}</div>;
};
export default Text;
