import Home from "../home/home";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNotifier from "../shared/app-notifier";
import { Imprint } from "../imprint/imprint";
import { responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import { useUiContext } from "../../hooks/use-ui-context";
import getMaterialUiTheme from "../../material-ui-theme";
import { CssBaseline } from "@material-ui/core";
import { Header } from "../header/header";
import "../../styles.scss";

function RouteHandler() {
  const {
    state: { theme },
  } = useUiContext();

  return (
    <ThemeProvider theme={responsiveFontSizes(getMaterialUiTheme(theme))}>
      <CssBaseline>
        <Router>
          <AppNotifier />
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/imprint" component={Imprint} />
          </Switch>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default RouteHandler;
