import React from "react";
import { Container } from "@material-ui/core";
import Introduction from "../map-overlay-3D/introduction";
import { StatisticSelector } from "../statistic-selector/statistic-selector";
import { ScrollButtonHelper } from "./scroll-button-helper";
import { useHeaderStyles } from "../header/header-styles";
import clsx from "clsx";
import { useUiContext } from "../../hooks/use-ui-context";
import StatisticStepper from "../statistic-stepper/statistic-stepper";

// TODO: condition when to show the scrollHelperButton, will change logic later
// TODO: integrate stepper from MUI: 1.Step choose statistic; 2.Step: choose visualization; 3.Step wait for visualization to be ready
// TODO: Make the stepper listen for query params '?statistic=foo&visualization=bar'
const condition = true;

function Home() {
  const classes = useHeaderStyles();
  const {
    state: { sidebarOpen },
  } = useUiContext();

  return (
    <Container
      disableGutters
      className={clsx(classes.content, {
        [classes.contentShift]: sidebarOpen,
      })}
    >
      <Introduction />
      <StatisticStepper children={<StatisticSelector />} />
      <ScrollButtonHelper condition={condition} />
      <div style={{ height: "50vh" }} />
    </Container>
  );
}

export default Home;
