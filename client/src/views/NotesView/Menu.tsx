import React, { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { addTagAPI } from "../../helpers/api/tags";

// Semantic UI button
import { Menu, Icon, Input } from "semantic-ui-react";
import { store, RootState } from "../../config/redux/store";
import { useSelector } from "react-redux";
import { IUser } from "../../interfaces/user";

const MenuItem = (): JSX.Element => {
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
                <div>
                    <Icon name="tag" size="large" />
                </div>
                <div className={styles.menu}>
                    <Menu fluid vertical tabular>
                        {filterNames.map((name: string) => (
                            <Menu.Item name={name} key={uuid()} />
                        ))}
                    </Menu>
                </div>
                <div>
                    <Icon
                        name="plus"
                        size="large"
                        onClick={() => setShow(!show)}
                    />
                </div>
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
            <div className={styles.settingContainer}>
                <Icon
                    name="cog"
                    size="large"
                    onClick={() => navigateSettings()}
                />
            </div>
        </div>
    );
};
export default MenuItem;
