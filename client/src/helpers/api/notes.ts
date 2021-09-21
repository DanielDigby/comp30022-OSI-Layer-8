import { INote } from "../../interfaces/note";
import { useDispatch } from "react-redux";
import { createNote } from "../../config/redux/noteSlice";

const dispatch = useDispatch();

export const postNote = (note: INote): void => {
    dispatch(createNote(note));
};
