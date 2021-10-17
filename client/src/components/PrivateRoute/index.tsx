/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Redirect, Route } from "react-router";
import { checkAuthAPI } from "../../helpers/api/users";

const PrivateRoute = ({
    children,
    path,
}: {
    children: JSX.Element;
    path: string;
}): JSX.Element => {
    const loggedIn = checkAuthAPI();
    return (
        <Route exact path={path}>
            {loggedIn ? { children } : <Redirect to="/login" />}
        </Route>
    );
};

export default PrivateRoute;
