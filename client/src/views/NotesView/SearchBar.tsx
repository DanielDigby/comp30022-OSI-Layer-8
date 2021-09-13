import React from "react";
import styles from "./SearchBar.module.css";
import { Search, Grid, Icon } from "semantic-ui-react";

const SearchBarItem = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div>
                <Grid>
                    <Grid.Column width={6}>
                        <Search />
                    </Grid.Column>
                </Grid>
            </div>
            <div>
                <Icon name="question circle outline" size="large" />
            </div>
        </div>
    );
};
export default SearchBarItem;
