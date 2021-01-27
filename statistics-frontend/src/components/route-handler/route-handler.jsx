import Home from "../home/home";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNotifier from "../shared/app-notifier";
import { Legal } from "../legal/legal";
import { responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import { useUiContext } from "../../hooks/use-ui-context";
import { CssBaseline } from "@material-ui/core";
import { Header } from "../header/header";
import "../../styles.scss";
// import { Footer } from "../footer/footer";
import { getMaterialUiTheme } from "../../material-ui-theme";
import { QueryBuilder } from "../query-builder/query-builder";
import { MobileNavigation } from "../mobile-navigation/mobile-navigation";

// TODO: fix footer
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
            <Route path="/query-builder" component={QueryBuilder} />
            <Route component={Home} />
          </Switch>
          {/*<Footer />*/}
          <MobileNavigation />
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default RouteHandler;
