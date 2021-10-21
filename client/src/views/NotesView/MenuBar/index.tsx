import React, { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { IUser } from "../../../interfaces/user";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { addTagAPI } from "../../../helpers/api/tags";
import { RootState } from "../../../config/redux/store";
import { updateFilter } from "../../../config/redux/noteSlice";
import { Menu, Icon, Input } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getColourScheme } from "../../../helpers/api/users";

const MenuBar = (): JSX.Element => {
    const history = useHistory();
    const navigateSettings = () => history.push("/settings");
    const dispatch = useDispatch();
    const store = useSelector((state: RootState) => state);
    const filter = store.notes.filter;
    const user: IUser = store.user.account;
    const baseFilters = ["Pinned", "Reminders", "Events"];

    useEffect(() => {
        updateFilterNames(baseFilters.concat(user.tags));
    }, [user]);

    const [show, setShow] = useState(false);
    const [tag, setTag] = useState("");
    const [filterNames, updateFilterNames] = useState(baseFilters);

    const handleTag = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    };

    const handlePlusClick = () => {
        addTagAPI(tag);
        setTag("");
        setShow(false);
        updateFilterNames(baseFilters.concat(user.tags));
    };

    return (
        <div className={styles.containerLeft}>
            <div className={styles.sideContainer}>
                <div className={styles.icon}>
                    <Icon name="tag" size="large" color={getColourScheme()} />
                </div>
                <div className={styles.menu}>
                    <Menu fluid secondary vertical>
                        {filterNames.map((name: string) => (
                            <Menu.Item
                                header
                                name={name}
                                key={uuid()}
                                className={styles.menuItem}
                                active={filter === name}
                                onClick={() => dispatch(updateFilter(name))}
                            />
                        ))}
                    </Menu>
                </div>
                {show ? (
                    <div className={styles.icon}>
                        <Icon
                            name="times"
                            size="large"
                            onClick={() => setShow(!show)}
                        />
                    </div>
                ) : (
                    <div className={styles.icon}>
                        <Icon
                            name="plus"
                            size="large"
                            onClick={() => setShow(!show)}
                        />
                    </div>
                )}

                <div className={styles.input}>
                    {show ? (
                        <Input
                            id="input-tag"
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
