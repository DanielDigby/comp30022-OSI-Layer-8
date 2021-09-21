import React from "react";
import { render, screen } from "@testing-library/react";
import HomeView from "../views/HomeView";

test("check that jest is working", () => {
    expect(1).toBe(1);
});

// test("renders BaseView", () => {
//     render(<HomeView />);
//     const textElement = screen.getByText(/cara/i);
//     expect(textElement).toBeInTheDocument();
// });
