import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import * as serviceWorker from "./service-worker";
import RouteHandler from "./components/route-handler/route-handler";
import { AlertContextProvider } from "./context/alert-context";
import { UiContextProvider } from "./context/ui-context";
import activatePolyfill from "./activatePolyfill";

function Bootstrap() {
  return (
    <UiContextProvider>
      <AlertContextProvider>
        <RouteHandler />
      </AlertContextProvider>
    </UiContextProvider>
  );
}

activatePolyfill().then(() =>
  ReactDOM.render(<Bootstrap />, document.getElementById("root"))
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
