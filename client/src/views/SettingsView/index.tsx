import React, { useState, useEffect, useRef } from "react";
import styles from "./SettingsView.module.css";
import Profile from "../../components/Profile";
import placeholder from "../../assets/placeholder.png";
import globalStyles from "../../App.module.css";
import ColourBlocks from "./ColourBlocks";
import { RootState } from "../../config/redux/store";
import { logOutAPI, updateProfilePicAPI } from "../../helpers/api/users";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkAuthAPI } from "../../helpers/api/users";
import { capitalize, cloneDeep } from "lodash";
import { updateUserAPI, updatePasswordAPI } from "../../helpers/api/users";
import { Segment, Icon, Image, Input, Ref, Button } from "semantic-ui-react";
import { IUser } from "../../interfaces/user";

const SettingsView = (): JSX.Element => {
    const history = useHistory();
    const back = () => history.goBack();
    const logOut = async () => await logOutAPI(history);
    const navigateDashboard = () => history.push("/");
    checkAuthAPI(history);

    // api call
    return (
        <div className={globalStyles.light}>
            <div className={styles.container}>
                <div className={styles.leftBanner}>
                    <div>
                        <Profile onClick={navigateDashboard} />
                        <div className={styles.signOut} onClick={logOut}>
                            <Icon name="sign out" size="big" color="grey" />
                            Sign out
                        </div>
                    </div>
                    <div className={styles.backButton}>
                        <Icon
                            name="arrow left"
                            size="big"
                            color="grey"
                            onClick={back}
                        />
                    </div>
                </div>
                {/* Top block of settings */}
                <div className={styles.main}>
                    <Segment raised className={styles.block}>
                        <div className={styles.heading}>
                            <h3>Personal details</h3>
                        </div>
                        {/* All the different forms to enter, split 30% for forms 70% for profile pic */}
                        <div className={styles.personal}>
                            <div className={styles.forms}>
                                <UserDetails />
                            </div>
                            <ProfilePic />
                        </div>
                    </Segment>
                    {/* Bottom block of settings */}
                    {/* TOGGLE OFF FALSE TO REENABLE FEATURE WHEN READY TO WORK ON COLOURSCHEMES */}
                    {false && (
                        <Segment raised className={styles.block}>
                            <div className={styles.heading}>
                                <h3>color schemes</h3>
                            </div>
                            <ColourBlocks />
                        </Segment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsView;

const UserDetails = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.account);
    const firstName = capitalize(user.firstName);
    const lastName = capitalize(user.lastName);
    const email = user.email;
    const password = "*********";

    const firstNameId = "First name";
    const lastNameId = "Last name";
    const emailId = "Email";
    const passwordId = "Password";

    const [editing, setEditing] = useState("");
    const [input, setInput] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    const handlePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword1(e.target.value);
    };
    const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword2(e.target.value);
    };

    const inputRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!inputRef.current?.contains(event.target as Node))
                setEditing("");
        });
    });

    const submitField = async (user: IUser) => {
        try {
            await updateUserAPI(user);
        } catch {
            alert("Cannot update profile while offline");
        }
    };

    const submitPasswords = async (password1: string, password2: string) => {
        try {
            if (password1 == passwordId) return;
            if (password1 == "") {
                alert("Passwords can not be empty");
                return;
            }
            if (password1 !== password2) {
                alert("Passwords must match");
                return;
            }
            await updatePasswordAPI(password1, password2, user);
            alert("Successfully updated password");
        } catch {
            alert("Cannot update passwords while offline");
        }
    };

    // checks which field is being edited and then updates a temp user as
    // necessary before saving
    const fieldConfirmClick = async () => {
        if (input == "") {
            alert("Field cannot be empty");
            return;
        }
        const temp = cloneDeep(user);
        switch (editing) {
            case firstNameId:
                if (input == firstNameId) break;

                temp.firstName = input;
                await submitField(temp);
                break;
            case lastNameId:
                if (input == lastNameId) break;
                temp.lastName = input;
                await submitField(temp);
                break;
            case emailId:
                if (input == emailId) break;
                temp.email = input;
                await submitField(temp);
                break;
            case passwordId:
                await submitPasswords(password1, password2);
                break;
        }
        setInput("");
        setEditing("");
    };
    const fieldEditClick = (name: string) => {
        setInput(name);
        setEditing(name);
    };

    const fieldProps = {
        editing,
        input,
        inputRef,
        fieldEditClick,
        fieldConfirmClick,
        handleInput,
    };

    const passwordFieldProps = {
        fieldId: passwordId,
        value: password,
        editing,
        input,
        inputRef,
        fieldEditClick,
        fieldConfirmClick,
        handlePassword1,
        handlePassword2,
    };

    // Each field has a condition to check which field is being edited and render
    // an input if necessary. Ref is used to handle clicking away from the field
    // to close
    return (
        <div>
            <div className={styles.formheading}>
                <div className={styles.formtitle}>
                    <UserField
                        {...{
                            fieldId: firstNameId,
                            value: firstName,
                            ...fieldProps,
                        }}
                    />
                    <UserField
                        {...{
                            fieldId: lastNameId,
                            value: lastName,
                            ...fieldProps,
                        }}
                    />
                    <UserField
                        {...{
                            fieldId: emailId,
                            value: email,
                            ...fieldProps,
                        }}
                    />
                    <PasswordField {...passwordFieldProps} />
                </div>
            </div>
        </div>
    );
};

type PasswordFieldProps = {
    editing: string;
    value: string;
    input: string;
    fieldId: string;
    inputRef: React.MutableRefObject<HTMLElement | null>;
    fieldEditClick: (name: string) => void;
    fieldConfirmClick: () => Promise<void>;
    handlePassword1: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePassword2: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const PasswordField = ({
    editing,
    value,
    input,
    fieldId,
    inputRef,
    fieldEditClick,
    fieldConfirmClick,
    handlePassword1,
    handlePassword2,
}: PasswordFieldProps): JSX.Element => {
    if (editing == fieldId)
        return (
            <Ref innerRef={inputRef}>
                <span>
                    <Input
                        style={{
                            fontSize: "15px",
                            marginBottom: "38px",
                            marginTop: "-10px",
                            width: "35.5%",
                        }}
                        placeholder={input}
                        onChange={handlePassword1}
                    />
                    <Input
                        action={{
                            icon: "check",
                            onClick: fieldConfirmClick,
                        }}
                        style={{
                            fontSize: "15px",
                            marginBottom: "38px",
                            marginTop: "-10px",
                            marginLeft: "20px",
                            width: "35.5%",
                        }}
                        placeholder={"Confirm"}
                        onChange={handlePassword2}
                    />
                </span>
            </Ref>
        );
    return (
        <div className={styles.field}>
            {value}
            <Button
                size="small"
                icon="pencil alternate"
                onClick={() => fieldEditClick(fieldId)}
            />
        </div>
    );
};

type UserFieldProps = {
    editing: string;
    value: string;
    input: string;
    fieldId: string;
    inputRef: React.MutableRefObject<HTMLElement | null>;
    fieldEditClick: (name: string) => void;
    fieldConfirmClick: () => Promise<void>;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const UserField = ({
    editing,
    value,
    input,
    fieldId,
    inputRef,
    fieldEditClick,
    fieldConfirmClick,
    handleInput,
}: UserFieldProps): JSX.Element => {
    if (editing == fieldId)
        return (
            <Ref innerRef={inputRef}>
                <Input
                    action={{
                        icon: "check",
                        onClick: fieldConfirmClick,
                    }}
                    style={{
                        fontSize: "15px",
                        marginBottom: "38px",
                        marginTop: "-10px",
                        width: "89%",
                    }}
                    placeholder={input}
                    onChange={handleInput}
                />
            </Ref>
        );
    return (
        <div className={styles.field}>
            {value}
            <Button
                size="small"
                icon="pencil alternate"
                onClick={() => fieldEditClick(fieldId)}
            />
        </div>
    );
};

const ProfilePic = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.account);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        try {
            updateProfilePicAPI(fileList);
        } catch (err) {
            alert("Profile picture upload failed");
        }
    };

    return (
        <div className={styles.profilePic}>
            <div className={styles.profileTitle}>
                Profile image
                <Button
                    as="label"
                    htmlFor="file"
                    size="small"
                    icon="upload"
                    style={{ marginLeft: "60px" }}
                />
                <input type="file" id="file" hidden onChange={handleFile} />
            </div>
            <div className={styles.image}>
                <Image
                    src={user.profilePic ? user.profilePic : placeholder}
                    size="medium"
                    rounded
                />
            </div>
        </div>
    );
};
