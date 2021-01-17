import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@material-ui/core";
import Introduction from "../introduction/introduction";
import { StatisticSelector } from "../statistic-selector/statistic-selector";
import clsx from "clsx";
import { useUiContext } from "../../hooks/use-ui-context";
import StatisticStepper from "../statistic-stepper/statistic-stepper";
import { useQueryParamsListener } from "../../hooks/use-query-params-listener";
import { VisualizationSelector } from "../visualization-selector/visualization-selector";
import { setActiveTab, setSidebarOpen } from "../../context/ui-actions";
import { AppMarkup } from "../SEO/app-markup";
import "./home.scss";
import GeoChart from "../geo-map/geo-map";
import { useStatisticData } from "../../hooks/use-statistic-data";
import { Ads } from "../ads/ads";
import GeoGlobe from "../geo-globe/geo-globe";
import { useHeaderStyles } from "../shared/header-styles";

function Home() {
  const classes = useHeaderStyles();
  const {
    statisticsList,
    geoJsonFromSelectedStatistic,
    setSelectedStatistic,
  } = useStatisticData();
  const { sidebarOpen, dispatch, visualizationLoaded } = useUiContext();
  const targetContainerRef = useRef(null);
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
  } = useQueryParamsListener();

  const [activeStep, setActiveStep] = useState(getStep(queryParams));

  useEffect(() => {
    dispatch(setActiveTab(0));
    setActiveStep(getStep(queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

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
        return (
          <div
            id="visualization-container"
            className="visualization-container"
            ref={targetContainerRef}
          >
            {queryParams.visualization === "globe" ? (
              <GeoGlobe
                showLoadingScreen={activeStep === 2}
                geoJsonFromSelectedStatistic={geoJsonFromSelectedStatistic}
                statisticsList={statisticsList}
              />
            ) : (
              <>
                <GeoChart
                  showLoadingScreen={activeStep === 2}
                  geoJsonFromSelectedStatistic={geoJsonFromSelectedStatistic}
                  statisticsList={statisticsList}
                />
              </>
            )}
          </div>
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
      className={clsx(classes.content, {
        [classes.contentShift]: sidebarOpen,
      })}
    >
      <AppMarkup />
      <Ads />
      <StatisticStepper
        activeStep={activeStep}
        removeLastQueryParam={removeLastQueryParam}
        queryParams={queryParams}
        resetQueryParams={resetQueryParams}
        statisticsList={statisticsList}
      />
      {getStatisticStepChildren()}
      <Introduction />
    </Container>
  );
}

export default Home;
