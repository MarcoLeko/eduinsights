import React from "react";
import "./home.scss";
import { Container } from "@material-ui/core";
import Introduction from "../map-overlay-3D/introduction";
import { StatisticSelector } from "../statistic-selector/statistic-selector";
import { ScrollButtonHelper } from "./scroll-button-helper";

// TODO: condition when to show the scrollHelperButton, will change logic later
// TODO: integrate stepper from MUI: 1.Step choose statistic; 2.Step: choose visualization; 3.Step wait for visualization to be ready
// TODO: add animations for statistic selector like in here: https://react-swipeable-views.com/demos/demos/
// TODO: Make the stepper listen for query params '?statistic=foo&visualization=bar'
const condition = true;

function Home() {
  return (
    <Container disableGutters>
      <Introduction />
      <StatisticSelector />
      <ScrollButtonHelper condition={condition} />
    </Container>
  );
}

export default Home;
