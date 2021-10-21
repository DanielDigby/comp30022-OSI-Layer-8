import React from "react";
import "./config/themes/colourscheme.css";
import styles from "./App.module.css";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Switch } from "react-router-dom";

// import views
import NotesView from "./views/NotesView";
import LogInView from "./views/LogInView";
import RegisterView from "./views/RegisterView";
import DashboardView from "./views/DashboardView";
import SettingsView from "./views/SettingsView";
import { useSelector } from "react-redux";
import { RootState } from "./config/redux/store";

const App = (): JSX.Element => {
    const colourScheme = useSelector(
        (state: RootState) => state.user.account.colourScheme
    );
    return (
        <div className={colourScheme}>
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
        </div>
    );
};

export default App;
