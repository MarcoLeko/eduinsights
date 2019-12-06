import Home from "../home/home";
import {connect} from "react-redux";
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './protected-route';
import SignUp from "../auth/sign-up";
import {checkLoginState} from "../../store/auth/action-creators";

function RouteHandler({isAuthenticated, checkAuthentication}) {

    useEffect(() => {checkAuthentication();}, [checkAuthentication]);

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
    checkAuthentication: user => dispatch(checkLoginState(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteHandler);
