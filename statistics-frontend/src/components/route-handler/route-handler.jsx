import Home from "../app/app";
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppNotifier from '../shared/app-notifier';

function RouteHandler() {

    return (
        <Router>
            <AppNotifier/>
            <Switch>
                <Home/>
            </Switch>
        </Router>
    );
}


export default RouteHandler;
