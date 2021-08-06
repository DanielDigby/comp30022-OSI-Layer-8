import React from "react";
import { Route, Switch } from "react-router-dom";

// import our views
import BaseView from "./views/BaseView";

const App = (): JSX.Element => {
    return (
        <div>
            <Switch>
                <Route path="/" component={BaseView} />
            </Switch>
        </div>
    );
};

export default App;
