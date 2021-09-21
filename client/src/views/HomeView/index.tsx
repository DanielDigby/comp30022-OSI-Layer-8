import React from "react";
import styles from "./HomeView.module.css";
import logo from "../../images/cara.svg";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNote } from "../../config/redux/noteSlice";

// Semantic UI button
import { Button } from "semantic-ui-react";
// import { RootState } from "../../config/redux/store";
import { INote } from "../../interfaces/note";

const HomeView = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateLogin = () => navHistory.push("/login");
    const navigateRegister = () => navHistory.push("/register");

    // const notes = useSelector((state: RootState) => state.notes.notes);
    const dispatch = useDispatch();

    const postNote = async () => {
        const note: INote = {
            _id: "61497208597ea28204547c0d",
            title: "NEW NOTE TEST",
        };
        dispatch(createNote(note));
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
            </div>
        </div>
    );
};

export default HomeView;
