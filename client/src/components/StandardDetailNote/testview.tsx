import Note from "../Note/index";
import React from "react";
import { NoteModes } from "../../interfaces/note";
import { INote } from "../../interfaces/note";

const testNote: INote = {
    user: "10292",
    title: "hello this is a super long title to test if it works thanks woohoo",
    text: "testing 123ksjfsifjhiueroeseljflkwejflwejkfklsjfnskljfnskdjlnslkdfnskdfnskldfnsdkjfnskdfnskldfnsdkjfnksdfnksdjnfksdjnfksjfnskljfnsdkfnsfnsdmnfsdkjnfksdjnfksdjnfksdljnflksdnfkdsnfkjsdn",
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
    return <Note note={testNote} mode={NoteModes.STANDARD} />;
};
export default NotesView;
