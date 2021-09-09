import React from "react";
import styles from "./Note.module.css";
import "semantic-ui-css/semantic.min.css";

import { Card, Icon, Image } from "semantic-ui-react";
import { Segment } from 'semantic-ui-react'

// Using this now oop change the <Route path="/" component={Note} /> line too
import Tag from "../Tag";
import HeadingText from "../HeadingText";


type HeaderType = {
    headerText: string;
};

const Note = (): JSX.Element => {
    // api call
    return (
        <div className={styles.Segment}>
            <Segment.Group raised>
                <Segment>
                    <HeadingText headingText = "Heading here" />
                    <p></p>
                    <p>Text</p>
                    <a>
                        <Tag tagName="Event" />
                    </a>
                </Segment>
                
            </Segment.Group>
        </div>
    );
};

/*
const Note = (): JSX.Element => {
    // api call
    return (
        <div className={styles.Card}>
            <Card>
                <Card.Content>
                    <Card.Header>Note Heading</Card.Header>
                    <Card.Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Tag tagName="Event" />
                    </a>
                </Card.Content>
            </Card>
        </div>
    );
};
*/

/* the original
const Note = (): JSX.Element => {
    // api call
    return (
        <div>
            <div className={styles.container}>note component</div>
        </div>
    );
};*/
export default Note;
