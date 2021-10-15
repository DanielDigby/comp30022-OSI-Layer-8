import Note from "../Note/index";
import React from "react";
import { NoteModes } from "../../interfaces/note";
import { INote } from "../../interfaces/note";

const existingNote: INote = {
    user: "10292",
    title: "hello this is a super long title to test if it works thanks woohoo",
    text: "Etiam tempor orci eu lobortis elementum. Eros donec ac odio tempor orci dapibus ultrices in. Nibh praesent tristique magna sit amet purus gravida quis. Nunc sed velit dignissim sodales ut eu sem integer vitae. Duis at tellus at urna condimentum mattis pellentesque id nibh. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Ultricies leo integer malesuada nunc. Nibh venenatis cras sed felis eget velit aliquet sagittis. Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. Nec ullamcorper sit amet risus. Pretium vulputate sapien nec sagittis aliquam. Tincidunt nunc pulvinar sapien et ligula. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Libero volutpat sed cras ornare arcu dui vivamus. Nunc sed id semper risus in hendrerit gravida rutrum. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Consectetur libero id faucibus nisl tincidunt eget nullam non.",
    image: "img",
    pinned: true,
    _id: "test",
    _clientId: "test",
    reminderTime: null,
    eventTime: null,
    tags: ["hi"],
    relatedNotes: [],
};

const emptyNote: INote = {
    user: "10292",
    title: null,
    text: null,
    image: "img",
    pinned: true,
    _id: "test",
    _clientId: "test",
    reminderTime: null,
    eventTime: null,
    tags: ["hi"],
    relatedNotes: [],
};

const NotesView = (): JSX.Element => {
    return <Note note={existingNote} mode={NoteModes.EDIT} />;
};
export default NotesView;
