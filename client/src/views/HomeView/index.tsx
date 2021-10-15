import React, { useRef } from "react";
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

/* USED FOR TESTING */
import EditNote from "../../components/Note/EditNote";

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
            reminderTime: new Date(),
            eventTime: null,
            pinned: false,
            tags: ["Birthdays"],
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

            <div className={styles.button}>
                <Button
                    className={styles.button}
                    basic
                    colour="black"
                    content="Sign in"
                    onClick={() => navigateLogin()}
                />
                <Button
                    basic
                    colour="black"
                    content="Register"
                    onClick={() => navigateRegister()}
                />
                <Button
                    basic
                    colour="black"
                    content="test api"
                    onClick={() => postNote()}
                />
                <Button
                    basic
                    colour="black"
                    content="test api edit"
                    onClick={() => putNote()}
                />
                <Button
                    basic
                    colour="black"
                    content="test api delete"
                    onClick={() => removeNote()}
                />
            </div>
        </div>
    );
};

export default HomeView;
