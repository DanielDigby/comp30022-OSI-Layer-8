import React from "react";
import styles from "./HomeView.module.css";
import logo from "../../images/cara.svg";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
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
            title: "NEW NOTE TEST",
            text: null,
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
            title: "NEW NOTE TEST 2",
            _id: null,
            _clientId: "3deec471-f6b6-4f8a-8299-3eedd101552b",
            text: null,
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
            title: "EDIT NOTE TEST 2",
            _clientId: "3deec471-f6b6-4f8a-8299-3eedd101552b",
            _id: null,
            text: null,
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
            <div className="image">
                <img className={styles.image} src={logo} />
            </div>

            <h1 className={styles.heading}>cara</h1>
            <h4 className={styles.heading2}>Untangle your personal life</h4>

            <div className={styles.button}>
                <Button
                    className={styles.button}
                    basic
                    colour="black"
                    content="Sign-In"
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
