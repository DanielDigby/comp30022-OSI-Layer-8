import React, { useState, useEffect } from "react";
import styles from "./NotesView.module.css";
import globalStyles from "../../App.module.css";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { addTagAPI } from "../../helpers/api/tags";

// Semantic UI button
import { Menu, Icon, Input } from "semantic-ui-react";
import { store } from "../../config/redux/store";

const MenuItem = (): JSX.Element => {
    const navHistory = useHistory();
    const navigateSettings = () => navHistory.push("/settings");
    const [show, setShow] = useState(false);
    const [tag, setTag] = useState("");
    const baseFilters = ["Pinned", "Reminders", "Events"];
    const [filterNames, updateFilterNames] = useState(baseFilters);

    useEffect(() => {
        async () => {
            const userTags = await store.getState().user.account.tags;
            updateFilterNames(baseFilters + userTags);
        };
    });

    const handleTag = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    };

    return (
        <div className={styles.containerLeft}>
            <div>
                <Icon name="tag" size="large" />
            </div>
            <div className={`${globalStyles.sideMenu} ${styles.menu}`}>
                <Menu fluid vertical tabular>
                    {filterNames.map((name: string) => (
                        <Menu.Item name={name} key={uuid()} />
                    ))}
                </Menu>
            </div>
            <div>
                <Icon name="plus" size="large" onClick={() => setShow(!show)} />
            </div>
            <div className={styles.input}>
                {show ? (
                    <Input
                        action={{
                            icon: "plus",
                            onClick: () => (
                                addTagAPI(tag),
                                setShow(false),
                                updateFilterNames(
                                    baseFilters.concat(
                                        store.getState().user.account.tags
                                    )
                                )
                            ),
                        }}
                        placeholder="New Tag"
                        onChange={handleTag}
                    />
                ) : null}
            </div>
            <div>
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
