import React from "react";
import { Route, Switch } from "react-router-dom";

import styles from "./App.module.css";

// import views
import NotesView from "./views/NotesView";
import LogInView from "./views/LogInView";
import RegisterView from "./views/RegisterView";
import DashboardView from "./views/DashboardView";
import SettingsView from "./views/SettingsView";
import HomeView from "./views/HomeView";

// Page to test what the note looks like
import NoteTestView from "./components/Note/testview";

const App = (): JSX.Element => {
    return (
        <div className={styles.pageContainer}>
            <Switch>
                {/* add more routes here, path is the url you want on the frontend component is the view to be rendered */}
                <Route exact path="/" component={DashboardView} />
                <Route path="/login" component={LogInView} />
                <Route path="/test" component={HomeView} />
                <Route path="/register" component={RegisterView} />
                <Route path="/settings" component={SettingsView} />
                <Route path="/notes" component={NotesView} />

                {/* Delete this after testing */}
                <Route path="/test" component={NoteTestView} />
            </Switch>
        </div>
    );
};

export default App;
