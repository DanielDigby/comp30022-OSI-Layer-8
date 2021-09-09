import React from "react";
import styles from "./Note.module.css";
import 'semantic-ui-css/semantic.min.css'

import { Icon } from 'semantic-ui-react'

const Tag = (): JSX.Element => {
    // api call
    return (
        <div>
            <Icon name='tag' />
            Contact 
        </div>
    );
};
export default Tag;



