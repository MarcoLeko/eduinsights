import React, { useCallback, useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Introduction from "../introduction/introduction";
import { StatisticSelector } from "../statistic-selector/statistic-selector";
import clsx from "clsx";
import { useUiContext } from "../../hooks/use-ui-context";
import StatisticStepper from "../statistic-stepper/statistic-stepper";
import { VisualizationSelector } from "../visualization-selector/visualization-selector";
import { setActiveTab, setSidebarOpen } from "../../context/ui-actions";
import "./home.scss";
import { usePreparedStatisticDataUtils } from "../../hooks/use-prepared-statistic-data-utils";
import { GeoVisualization } from "../geo-visualization/geo-visualization";
import { useQueryParams } from "../../hooks/use-query-params";

function Home() {
  const {
    statisticsList,
    geoJsonFromSelectedStatistic,
    setSelectedStatistic,
  } = usePreparedStatisticDataUtils();
  const { sidebarOpen, dispatch, visualizationLoaded } = useUiContext();
  const dispatchSidebarState = useCallback(
    function (args) {
      dispatch(setSidebarOpen(args));
    },
    [dispatch]
  );
  const {
    queryParams,
    addNextQueryParam,
    removeLastQueryParam,
    resetQueryParams,
  } = useQueryParams();

  const [activeStep, setActiveStep] = useState(getStep());

  useEffect(() => {
    dispatch(setActiveTab(0));
    setActiveStep(getStep());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams, visualizationLoaded]);

  function getStep() {
    if (
      queryParams.statistic &&
      queryParams.visualization &&
      visualizationLoaded
    ) {
      return 3;
    }
    if (queryParams.statistic && queryParams.visualization) {
      return 2;
    }

    if (queryParams.statistic && !queryParams.visualization) {
      return 1;
    }

    return 0;
  }

  function getActiveStepNode() {
    const showGlobe = queryParams.visualization === "globe";

    switch (activeStep) {
      case 3:
      case 2:
        return (
          <GeoVisualization
            showLoadingScreen={activeStep === 2}
            geoJsonFromSelectedStatistic={geoJsonFromSelectedStatistic}
            showGlobe={showGlobe}
          />
        );
      case 1:
        return <VisualizationSelector addNextQueryParam={addNextQueryParam} />;
      case 0:
      default:
        return (
          <StatisticSelector
            onStatisticClick={addNextQueryParam}
            statisticsList={statisticsList}
            setSelectedStatistic={setSelectedStatistic}
          />
        );
    }
  }

  function closeSidebar() {
    if (sidebarOpen) {
      dispatchSidebarState(false);
    }
  }

  return (
    <Container
      disableGutters
      onClick={closeSidebar}
      className={clsx("content", sidebarOpen && "content-shift")}
    >
      <StatisticStepper
        activeStep={activeStep}
        removeLastQueryParam={removeLastQueryParam}
        queryParams={queryParams}
        resetQueryParams={resetQueryParams}
        statisticsList={statisticsList}
      />
      {getActiveStepNode()}
      <Introduction />
    </Container>
  );
}

export default Home;
