import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import styles from "./App.module.css";

// import views
import NotesView from "./views/NotesView";
import LogInView from "./views/LogInView";
import RegisterView from "./views/RegisterView";
import DashboardView from "./views/DashboardView";
import SettingsView from "./views/SettingsView";

const App = (): JSX.Element => {
    return (
        <div className={styles.pageContainer}>
            <Switch>
                {/* add more routes here, path is the url you want on the frontend component is the view to be rendered */}
                <Route path="/register" component={RegisterView} />
                <Route path="/login" component={LogInView} />

                <PrivateRoute path="">
                    <DashboardView />
                </PrivateRoute>

                <PrivateRoute path="/settings">
                    <SettingsView />
                </PrivateRoute>

                <PrivateRoute path="/notes">
                    <NotesView />
                </PrivateRoute>
            </Switch>
        </div>
    );
};

export default App;
