/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Redirect, Route } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { checkAuthAPI } from "../../helpers/api/users";

const PrivateRoute = ({
    component,
    path,
}: {
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>
        | undefined;
    path: string;
}): JSX.Element => {
    const loggedIn = checkAuthAPI();

    if (loggedIn) return <Route exact path={path} component={component} />;
    else return <Redirect to="/login" />;
};

export default PrivateRoute;
