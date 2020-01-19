import Home from "../app/app";
import {connect} from "react-redux";
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './protected-route';
import SignUp from "../auth/sign-up";
import AppNotifier from '../shared/app-notifier';
import VerifyEmail from "../auth/account-verification/verify-email";

function RouteHandler({isAuthenticated}) {

    return (
        <Router>
            <AppNotifier/>
            <Switch>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/verify-email" component={VerifyEmail}/>
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Home/>
                </ProtectedRoute>
            </Switch>
        </Router>
    );
}

const mapStateToProps = store => ({
    isAuthenticated: store.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(RouteHandler);
