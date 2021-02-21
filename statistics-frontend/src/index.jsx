import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import RouteHandler from "./components/route-handler/route-handler";
import { AlertContextProvider } from "./context/alert-context";
import { UiContextProvider } from "./context/ui-context";
import { initializeReporting } from "./report-web-vitals";

function Bootstrap() {
  return (
    <UiContextProvider>
      <AlertContextProvider>
        <RouteHandler />
      </AlertContextProvider>
    </UiContextProvider>
  );
}

ReactDOM.render(<Bootstrap />, document.getElementById("root"));

serviceWorkerRegistration.register();

initializeReporting();
