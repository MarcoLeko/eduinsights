import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Introduction from "../introduction/introduction";
import { StatisticSelector } from "../statistic-selector/statistic-selector";
import { ScrollButtonHelper } from "./scroll-button-helper";
import { useHeaderStyles } from "../header/header-styles";
import clsx from "clsx";
import { useUiContext } from "../../hooks/use-ui-context";
import StatisticStepper from "../statistic-stepper/statistic-stepper";
import { useQueryParamsListener } from "../../hooks/use-query-params-listener";
import { Visualization } from "../visualization/visualization";
import { MapOverlay3D } from "../map-overlay-3D/map-overlay-3D";
import MapOverlay2D from "../map-overlay-2D/map-overlay-2D";
import { setActiveTab } from "../../context/ui-actions";

// TODO: integrate stepper from MUI: 1.Step choose statistic; 2.Step: choose visualization; 3.Step wait for visualization to be ready - show scroll helper button afterwards
function Home() {
  const classes = useHeaderStyles();
  const { sidebarOpen, dispatch, visualizationLoaded } = useUiContext();
  const {
    queryParams,
    addNextQueryParam,
    removeLastQueryParam,
    resetQueryParams,
  } = useQueryParamsListener();

  const [activeStep, setActiveStep] = useState(getStep(queryParams));

  useEffect(() => {
    dispatch(setActiveTab(0));
    setActiveStep(getStep(queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams, visualizationLoaded]);

  function getStep(params) {
    if (params.statistic && params.visualization && visualizationLoaded) {
      return 3;
    }
    if (params.statistic && params.visualization) {
      return 2;
    }

    if (params.statistic && !params.visualization) {
      return 1;
    }

    return 0;
  }

  function getStatisticStepChildren() {
    switch (activeStep) {
      case 3:
      case 2:
        if (queryParams.visualization === "globe") {
          return <MapOverlay3D />;
        }

        return <MapOverlay2D />;
      case 1:
        return <Visualization addNextQueryParam={addNextQueryParam} />;
      case 0:
      default:
        return <StatisticSelector onStatisticClick={addNextQueryParam} />;
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
      <StatisticStepper
        activeStep={activeStep}
        removeLastQueryParam={removeLastQueryParam}
        queryParams={queryParams}
        resetQueryParams={resetQueryParams}
      />
      {getStatisticStepChildren()}
      <ScrollButtonHelper show={activeStep === 3} />
    </Container>
  );
}

export default Home;
