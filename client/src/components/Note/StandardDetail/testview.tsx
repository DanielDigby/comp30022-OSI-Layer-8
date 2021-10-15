import Note from "../index";
import React from "react";
import { NoteModes } from "../../../interfaces/note";
import { INote } from "../../../interfaces/note";

const testNote: INote = {
    user: "10292",
    title: "hello this is a super long title to test if it works thanks woohoo",
    text: "Raising say express had chiefly detract demands she. Quiet led own cause three him. Front no party young abode state up. Saved he do fruit woody of to. Met defective are allowance two perceived listening consulted contained. It chicken oh colonel pressed excited suppose to shortly. He improve started no we manners however effects. Prospect humoured mistress to by proposal marianne attended. Simplicity the far admiration preference everything. Up help home head spot an he room in. Seen you eyes son show. Far two unaffected one alteration apartments celebrated but middletons interested. Described deficient applauded consisted my me do. Passed edward two talent effect seemed engage six. On ye great do child sorry lived. Proceed cottage far letters ashamed get clothes day. Stairs regret at if matter to. On as needed almost at basket remain. By improved sensible servants children striking in surprise. Marianne or husbands if at stronger ye. Considered is as middletons uncommonly. Promotion perfectly ye consisted so. His chatty dining for effect ladies active. Equally journey wishing not several behaved chapter she two sir. Deficient procuring favourite extensive you two. Yet diminution she impossible understood age.",
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
