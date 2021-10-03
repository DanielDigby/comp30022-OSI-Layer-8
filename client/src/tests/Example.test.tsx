import React from "react";
import { render } from "@testing-library/react";
import Note from "../components/Note";

test("check that jest is working", () => {
    render(<Note />);
    expect(1).toBe(1);
});
