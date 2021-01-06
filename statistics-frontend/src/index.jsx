import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import * as serviceWorker from "./service-worker";
import RouteHandler from "./components/route-handler/route-handler";
import { AlertContextProvider } from "./context/alert-context";
import { UiContextProvider } from "./context/ui-context";
import activatePolyfill from "./activatePolyfill";
import { reportWebVitals, sendToAnalytics } from "./report-web-vitals";
import ReactGA from "react-ga";

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

// TODO: set as env-var.
ReactGA.initialize("UA-186555914-1");
ReactGA.pageview(window.location.pathname + window.location.search);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendToAnalytics);
