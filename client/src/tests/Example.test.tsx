import React from "react";
import { render } from "@testing-library/react";
import Note from "../components/Note";
import { NoteModes } from "../interfaces/note";

test("check that jest is working", () => {
    const testNote = {
        _id: "sdhfjhasdfa",
        _clientId: "hdjasfhkjasd",
        title: "test",
        text: "test",
        image: "test",
        reminderTime: null,
        eventTime: null,
        pinned: true,
        tags: [],
        relatedNotes: [],
    };
    render(<Note note={testNote} mode={NoteModes.STANDARD} />);
    expect(1).toBe(1);
});
