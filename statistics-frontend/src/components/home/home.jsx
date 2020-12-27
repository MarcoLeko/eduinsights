import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import Introduction from "../map-overlay-3D/introduction";
import { StatisticSelector } from "../statistic-selector/statistic-selector";
import { ScrollButtonHelper } from "./scroll-button-helper";
import { useHeaderStyles } from "../header/header-styles";
import clsx from "clsx";
import { useUiContext } from "../../hooks/use-ui-context";
import StatisticStepper from "../statistic-stepper/statistic-stepper";
import { useStatisticStepListener } from "../../hooks/use-statistic-step-listener";
import { Visualization } from "../visualization/visualization";
import { MapOverlay3D } from "../map-overlay-3D/map-overlay-3D";
import MapOverlay2D from "../map-overlay-2D/map-overlay-2D";
import { setActiveTab } from "../../context/ui-actions";

// TODO: integrate stepper from MUI: 1.Step choose statistic; 2.Step: choose visualization; 3.Step wait for visualization to be ready - show scroll helper button afterwards

function Home() {
  const classes = useHeaderStyles();
  const {
    state: { sidebarOpen },
    dispatch,
  } = useUiContext();
  const { activeStep, queryParams, handleNext } = useStatisticStepListener();

  useEffect(() => {
    dispatch(setActiveTab(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getStatisticStepChildren() {
    switch (activeStep) {
      case 2:
        if (queryParams.visualization === "globe") {
          return <MapOverlay3D />;
        }

        return <MapOverlay2D />;
      case 1:
        return <Visualization />;
      case 0:
      default:
        return <StatisticSelector onStatisticClick={handleNext} />;
    }
  }
  return (
    <Container
      disableGutters
      className={clsx(classes.content, {
        [classes.contentShift]: sidebarOpen,
      })}
    >
      <Introduction />
      <StatisticStepper />
      {getStatisticStepChildren()}
      <ScrollButtonHelper condition={activeStep === 3} />
    </Container>
  );
}

export default Home;
