import { postNote } from "./notes";
import { useDispatch, useSelector } from "react-redux";
import { clearNotes } from "../../config/redux/noteSlice";
import { RootState } from "../../config/redux/store";
import axios from "axios";

jest.mock("axios");

describe("Notes API Helpers", () => {
    describe("Post a note to backend", () => {
        beforeEach(() => {
            const dispatch = useDispatch();
            dispatch(clearNotes());
        });

        it(
            "When a valid note is passed to the api function it should:\n" +
                "\t add the note to the redux store" +
                "\t send a request to the backend",
            () => {
                // arrange
                const note = {
                    title: "hello world",
                };
                const apiNote = {
                    _id: "asjkdfaskjfhaklsbfkljabjkl",
                    title: "hello world",
                };

                axios.get = jest
                    .fn()
                    .mockImplementationOnce(() =>
                        Promise.resolve({ data: apiNote })
                    );

                // act
                postNote(note);

                // assert
                const notes = useSelector(
                    (state: RootState) => state.notes.notes
                );
                expect(notes[0]).toMatchObject(apiNote);
                // expect num times axios called = 1
            }
        );
    });
});

// test("updateToDo test", () => {
//     let state = store.getState().toDo;
//     const originalToDo = state.toDoList.find((p) => p.toDoId === 1);
//     expect(originalToDo?.isComplete).toBeTruthy();
//     expect(originalToDo?.description).toBe("eat tacos");

//     store.dispatch(updateToDo({ toDoId: 1, isComplete: false }));
//     state = store.getState().toDo;
//     let changedToDo = state.toDoList.find((p) => p.toDoId === 1);
//     expect(changedToDo?.isComplete).toBeFalsy();

//     store.dispatch(updateToDo({ toDoId: 1, description: "be merry" }));
//     state = store.getState().toDo;
//     changedToDo = state.toDoList.find((p) => p.toDoId === 1);
//     expect(changedToDo?.description).toBe("be merry");

//     store.dispatch(
//         updateToDo({ toDoId: 1, description: "eat tacos", isComplete: true })
//     );
//     state = store.getState().toDo;
//     const backToOriginalToDo = state.toDoList.find((p) => p.toDoId === 1);

//     // snapshots can be objects
//     expect(backToOriginalToDo).toMatchInlineSnapshot(`
//     Object {
//       "description": "eat tacos",
//       "isComplete": true,
//       "profileId": 1,
//       "toDoId": 1,
//     }
//   `);

//     // deep object equality
//     expect(backToOriginalToDo).toEqual(originalToDo);
// });
