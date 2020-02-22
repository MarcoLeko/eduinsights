import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import configureStore from "./store/store";
import * as serviceWorker from "./service-worker";
import { Provider } from "react-redux";
import { getUserData } from "./store/thunks";
import theme from "./material-ui-theme";
import { ThemeProvider } from "@material-ui/core/styles";
import RouteHandler from "./components/route-handler/route-handler";

function Bootstrap({ state }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={configureStore(state)}>
        <RouteHandler />
      </Provider>
    </ThemeProvider>
  );
}

(async () => ReactDOM.render(<Bootstrap state={await getUserData()} />, document.getElementById('root')))();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
