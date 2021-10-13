import React, { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { addTagAPI } from "../../../helpers/api/tags";

// Semantic UI button
import { Menu, Icon, Input } from "semantic-ui-react";
import { RootState } from "../../../config/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../interfaces/user";
import { updateFilter } from "../../../config/redux/noteSlice";

const MenuBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const store = useSelector((state: RootState) => state);
    const filter = store.notes.filter;
    const user: IUser = useSelector((state: RootState) => state.user.account);
    const navHistory = useHistory();
    const navigateSettings = () => navHistory.push("/settings");
    const [show, setShow] = useState(false);
    const [tag, setTag] = useState("");
    const baseFilters = ["Pinned", "Reminders", "Events"];
    const [filterNames, updateFilterNames] = useState(baseFilters);

    const handleTag = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    };

    const handlePlusClick = () => {
        addTagAPI(tag);
        setTag("");
        setShow(false);
        updateFilterNames(
            baseFilters.concat(store.getState().user.account.tags)
        );
    };

    useEffect(() => {
        updateFilterNames(baseFilters.concat(user?.tags));
    }, [user]);

    return (
        <div className={styles.containerLeft}>
            <div className={styles.sideContainer}>
                <div className={styles.icon}>
                    <Icon name="tag" size="large" color="orange" />
                </div>
                <div className={styles.menu}>
                    <Menu fluid secondary vertical>
                        {filterNames.map((name: string) => (
                            <Menu.Item
                                header
                                name={name}
                                key={uuid()}
                                active={filter === name}
                                onClick={() => dispatch(updateFilter(name))}
                            />
                        ))}
                    </Menu>
                </div>
                {show ? (
                    <div className={styles.icon}>
                        <Icon name="times" onClick={() => setShow(!show)} />
                    </div>
                ) : (
                    <div className={styles.icon}>
                        <Icon name="plus" onClick={() => setShow(!show)} />
                    </div>
                )}

                <div className={styles.input}>
                    {show ? (
                        <Input
                            action={{
                                icon: "plus",
                                onClick: handlePlusClick,
                            }}
                            placeholder="New Tag"
                            onChange={handleTag}
                        />
                    ) : null}
                </div>
            </div>
            <div className={styles.settings}>
                <Icon
                    name="cog"
                    size="big"
                    color="grey"
                    onClick={() => navigateSettings()}
                />
            </div>
        </div>
    );
};
export default MenuBar;
