import Home from "../home/home";
import {connect} from "react-redux";
import React from 'react';
import {Switch, Route,
    BrowserRouter as Router,} from 'react-router-dom';
import ProtectedRoute from './protected-route';
import SignUp from "../auth/sign-up";

function RouteHandler({isLoggedIn}) {

    return (
        <Router>
        <Switch>
            <Route path="/sign-up" component={SignUp}/>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home/>
            </ProtectedRoute>
        </Switch>
        </Router>
    );
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(RouteHandler);
