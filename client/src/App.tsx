import React from "react";
import { Route, Switch } from "react-router-dom";

import styles from "./App.module.css";

// import our views
import BaseView from "./views/BaseView";
import NotesView from "./views/NotesView";

const App = (): JSX.Element => {
    return (
        <div id="ipad-container" className="container-center-horizontal">
            <Switch>
                {/* add more routes here, path is the url you want on the frontend component is the view to be rendered */}
                <Route path="/notes" component={NotesView} />
                <Route path="/" component={BaseView} />
            </Switch>
        </div>
    );
};

export default App;
