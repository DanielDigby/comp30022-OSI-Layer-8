import React, { useState } from "react";
import styles from "./DashboardView.module.css";
import { Link } from "react-router-dom";

// Semantic UI button
import { Button, Menu } from "semantic-ui-react";

const DashboardView = (): JSX.Element => {
    // api call
    return (
        <div>
            <div className={styles.container}>
                hello world dashboardview
            </div>

            <div className={styles.footer}>
                <Link to="/">
                    <Button size='medium'>Go Back</Button>
                </Link>
            </div>

            <div className={styles.footer}>
                <Link to="/settings">
                    <Button size='medium'>temp settings button</Button>
                </Link> 
            </div>
        </div>
    );
};

export default DashboardView;