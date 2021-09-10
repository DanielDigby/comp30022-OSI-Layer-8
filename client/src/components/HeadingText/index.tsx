import React from "react";
import "semantic-ui-css/semantic.min.css";

type HeadingProps = {
    headingText: string;
};

const HeadingText = ({ headingText }: HeadingProps): JSX.Element => {
    // api call
    return <div>{headingText}</div>;
};
export default HeadingText;
