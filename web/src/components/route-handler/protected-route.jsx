import LogIn from "../auth/log-in";
import React from "react";
import {Route} from "react-router-dom";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function ProtectedRoute({children, isAuthenticated, ...rest}) {

    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated ? (
                    children
                ) : (
                    <Route path="/" component={LogIn}
                    />
                )
            }
        />
    );
}

export default ProtectedRoute;
