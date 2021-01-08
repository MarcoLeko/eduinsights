import ReactGA from "react-ga";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

// TODO: set as env-var.
ReactGA.initialize("UA-186555914-1", { debug: true });
ReactGA.pageview(window.location.pathname + window.location.search);

const ga = ReactGA.ga();

function sendToAnalytics({ id, name, value }) {
  ga("send", "event", {
    eventCategory: "Web Vitals",
    eventAction: name,
    eventValue: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate
  });
}

function reportWebVitals(onPerfEntry) {
  getCLS(onPerfEntry);
  getFID(onPerfEntry);
  getFCP(onPerfEntry);
  getLCP(onPerfEntry);
  getTTFB(onPerfEntry);
}

export { reportWebVitals, sendToAnalytics };
