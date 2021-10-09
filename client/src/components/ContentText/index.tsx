import React from "react";
import "semantic-ui-css/semantic.min.css";

type TextProps = {
    text: string;
};

const Text = ({ text }: TextProps): JSX.Element => {
    return <div>{text}</div>;
};
export default Text;
