import React, { useCallback, useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Introduction from "../introduction/introduction";
import { StatisticSelector } from "../statistic-selector/statistic-selector";
import clsx from "clsx";
import { useUiContext } from "../../hooks/use-ui-context";
import StatisticStepper from "../statistic-stepper/statistic-stepper";
import { VisualizationSelector } from "../visualization-selector/visualization-selector";
import { setActiveTab, setSidebarOpen } from "../../context/ui-actions";
import { AppMarkup } from "../SEO/app-markup";
import "./home.scss";
import { usePreparedStatisticData } from "../../hooks/use-prepared-statistic-data";
import { GeoVisualization } from "../geo-visualization/geo-visualization";
import { useQueryParamsListenerForPreparedStatistics } from "../../hooks/query-params/use-query-params-listener-for-prepared-statistics";

function Home() {
  const {
    statisticsList,
    geoJsonFromSelectedStatistic,
    setSelectedStatistic,
  } = usePreparedStatisticData();
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
  } = useQueryParamsListenerForPreparedStatistics();

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
      <AppMarkup />
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
