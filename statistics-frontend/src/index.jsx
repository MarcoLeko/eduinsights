import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import configureStore from "./store/store";
import * as serviceWorker from "./service-worker";
import { Provider } from "react-redux";
import theme from "./material-ui-theme";
import { ThemeProvider } from "@material-ui/core/styles";
import RouteHandler from "./components/route-handler/route-handler";

function Bootstrap() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={configureStore()}>
        <RouteHandler />
      </Provider>
    </ThemeProvider>
  );
}

ReactDOM.render(<Bootstrap />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
