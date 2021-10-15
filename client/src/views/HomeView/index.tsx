import Note from "../../components/Note/index";
import React from "react";
import { store } from "../../config/redux/store";
import styles from "./HomeView.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import randomName from "random-name";
import {
    createNote,
    updateNote,
    deleteNote,
} from "../../config/redux/noteSlice";

// Semantic UI button
import { Button } from "semantic-ui-react";
import { INote, INoteWithoutIds } from "../../interfaces/note";

const HomeView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateLogin = () => navHistory.push("/login");
    const navigateRegister = () => navHistory.push("/register");

    const dispatch = useDispatch();

    const postNote = async () => {
        const note: INoteWithoutIds = {
            title: randomName.place(),
            user: store.getState().user.account._id,
            text: randomName.place(),
            image: null,
            reminderTime: null,
            eventTime: null,
            pinned: false,
            tags: [],
            relatedNotes: [],
        };
        dispatch(createNote(note));
    };

    const putNote = async () => {
        const note: INote = {
            title: randomName.place(),
            user: store.getState().user.account._id,
            _id: null,
            _clientId: "3deec471-f6b6-4f8a-8299-3eedd101552b",
            text: randomName.place(),
            image: null,
            reminderTime: null,
            eventTime: null,
            pinned: false,
            tags: [],
            relatedNotes: [],
        };
        dispatch(updateNote(note));
    };

    const removeNote = async () => {
        const note: INote = {
            title: randomName.place(),
            user: store.getState().user.account._id,
            _clientId: "3deec471-f6b6-4f8a-8299-3eedd101552b",
            _id: null,
            text: randomName.place(),
            image: null,
            reminderTime: null,
            eventTime: null,
            pinned: false,
            tags: [],
            relatedNotes: [],
        };
        dispatch(deleteNote(note));
    };

    // api call
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>cara</h1>
            <h4 className={styles.heading2}>Untangle your personal life</h4>

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
