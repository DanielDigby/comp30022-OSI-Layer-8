import React from "react";
import styles from "./ColourBlocks.module.css";

import { Segment, Radio } from "semantic-ui-react";
import { getColourScheme, updateUserAPI } from "../../helpers/api/users";
import { cloneDeep } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../config/redux/store";

const ColourBlocks = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.account);
    const updateColour = async (color: string) => {
        const temp = cloneDeep(user);
        temp.colourScheme = color;
        await updateUserAPI(temp);
    };
    return (
        <div className={styles.blocks}>
            <div className={styles.block}>
                <Segment raised className={styles.light} />
                <Radio
                    className={styles.checkbox}
                    label="light"
                    checked={getColourScheme() == "orange"}
                    onClick={() => updateColour("orange")}
                />
            </div>
            <div className={styles.block}>
                <Segment raised className={styles.slate} />
                <Radio
                    className={styles.checkbox}
                    label="slate"
                    checked={getColourScheme() == "blue"}
                    onClick={() => updateColour("blue")}
                />
            </div>
            <div className={styles.block}>
                <Segment raised className={styles.lemonade} />
                <Radio
                    className={styles.checkbox}
                    label="cherry"
                    checked={getColourScheme() == "red"}
                    onClick={() => updateColour("red")}
                />
            </div>
            <div className={styles.block}>
                <Segment
                    raised
                    className={styles.sky}
                    styles={{ backgroundColor: "!important #e4e5ed" }}
                />
                <Radio
                    className={styles.checkbox}
                    label="sky"
                    checked={getColourScheme() == "teal"}
                    onClick={() => updateColour("teal")}
                />
            </div>
        </div>
    );
};

export default ColourBlocks;
