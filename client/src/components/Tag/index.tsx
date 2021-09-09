import React from "react";
import styles from "./Note.module.css";
import "semantic-ui-css/semantic.min.css";

import { Icon } from "semantic-ui-react";

type TagProps = {
    tagName: string;
};

const Tag = ({ tagName }: TagProps): JSX.Element => {
    // api call
    return (
        <div>
            <Icon name="tag" />
            {tagName}
        </div>
    );
};
export default Tag;
