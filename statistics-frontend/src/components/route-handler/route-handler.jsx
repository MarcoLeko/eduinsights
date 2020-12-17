import Home from "../app/app";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNotifier from "../shared/app-notifier";
import { Imprint } from "../imprint/imprint";

function RouteHandler() {
  return (
    <Router>
      <AppNotifier />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/imprint" component={Imprint} />
      </Switch>
    </Router>
  );
}

export default RouteHandler;
