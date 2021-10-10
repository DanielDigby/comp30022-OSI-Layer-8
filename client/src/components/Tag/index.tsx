import React from "react";
import "semantic-ui-css/semantic.min.css";

import { Icon } from "semantic-ui-react";

type TagProps = {
    tagName: string;
};

const Tag = ({ tagName }: TagProps): JSX.Element => {
    // api call
    return (
        <div>
            <Icon name="tag" color="grey" />
            {tagName}
        </div>
    );
};
export default Tag;
