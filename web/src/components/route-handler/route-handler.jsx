import Home from "../home/home";
import {connect} from "react-redux";
import React, {useEffect} from 'react';
import {Switch, Route,
    BrowserRouter as Router,} from 'react-router-dom';
import ProtectedRoute from './protected-route';
import SignUp from "../auth/sign-up";
import {logIn} from "../../store/auth/action-creators";

function RouteHandler({isAuthenticated, checkAuthentication}) {

    useEffect(() => {checkAuthentication();});

    return (
        <Router>
        <Switch>
            <Route path="/sign-up" component={SignUp}/>
            <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home/>
            </ProtectedRoute>
        </Switch>
        </Router>
    );
}

const mapStateToProps = ({authReducer}) => ({
    isAuthenticated: authReducer.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    checkAuthentication: user => dispatch(logIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteHandler);
