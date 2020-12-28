import Home from "../home/home";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNotifier from "../shared/app-notifier";
import { Legal } from "../legal/legal";
import { responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import { useUiContext } from "../../hooks/use-ui-context";
import getMaterialUiTheme from "../../material-ui-theme";
import { CssBaseline } from "@material-ui/core";
import { Header } from "../header/header";
import "../../styles.scss";
import { Footer } from "../footer/footer";

function RouteHandler() {
  const { theme } = useUiContext();

  return (
    <ThemeProvider theme={responsiveFontSizes(getMaterialUiTheme(theme))}>
      <CssBaseline>
        <Router>
          <AppNotifier />
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/legal" component={Legal} />
          </Switch>
          <Footer />
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default RouteHandler;
