import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
// import PrivateRoute from "./components/PrivateRoute";
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

                <PrivateRoute path="/settings" component={SettingsView} />
                <PrivateRoute path="/notes" component={NotesView} />
                <PrivateRoute path="/" component={DashboardView} />
            </Switch>
        </div>
    );
};

export default App;
