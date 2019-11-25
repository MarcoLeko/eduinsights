import Home from "../home/home";
import socket from "../../socket-io-client";
import {connect} from "react-redux";
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ProtectedRoute from './protected-route';

function RouteHandler({isLoggedIn}) {

    return (
        <Router>
            <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home socket={socket}/>
            </ProtectedRoute>
        </Router>
    );
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(RouteHandler);