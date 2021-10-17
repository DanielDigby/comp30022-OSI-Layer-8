/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router";
import { checkAuthAPI } from "../../helpers/api/users";

const PrivateRoute = ({
    component,
    path,
}: {
    component: FunctionComponent<any>;
    path: string;
}): JSX.Element => {
    const loggedIn = checkAuthAPI();

    if (loggedIn) return <Route exact path={path} component={component} />;
    else return <Redirect to="/login" />;
};

export default PrivateRoute;
