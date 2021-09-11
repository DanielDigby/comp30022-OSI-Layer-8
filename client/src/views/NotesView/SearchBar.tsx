import React from "react";
import styles from "./SearchBar.module.css";
import { Search, Grid } from "semantic-ui-react";

const SearchBarItem = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <Grid>
                <Grid.Column width={6}>
                    <Search />
                </Grid.Column>
            </Grid>
        </div>
    );
};
export default SearchBarItem;
