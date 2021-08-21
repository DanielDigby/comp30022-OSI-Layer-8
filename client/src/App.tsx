import React from "react";
import { Route, Switch } from "react-router-dom";

// import our views
import BaseView from "./views/BaseView";
import LogIn from "./components/LogIn"
import Register from "./components/Register"

const App = (): JSX.Element => {
    return (
        <div>
            <LogIn />
        </div>
    );
};

export default App;
