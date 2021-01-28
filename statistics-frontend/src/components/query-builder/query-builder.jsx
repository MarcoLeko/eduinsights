import clsx from "clsx";
import { Container, Typography } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useUiContext } from "../../hooks/use-ui-context";
import { setActiveTab, setSidebarOpen } from "../../context/ui-actions";
import "./query-builder.scss";
import StatisticStepperQueryBuilder from "../statistic-stepper-query-builder/statistic-stepper-query-builder";
import { useQueryBuilder } from "../../hooks/use-query-builder";
import { FilterSelector } from "../filter-selector/filter-selector";
import { VisualizationSelector } from "../visualization-selector/visualization-selector";
import { GeoVisualization } from "../geo-visualization/geo-visualization";

export function QueryBuilder() {
  const { sidebarOpen, dispatch, visualizationLoaded } = useUiContext();

  const {
    filterStructure,
    selectedFilterStructure,
    setSelectedFilterStructure,
    isFilterValid,
    activeStep,
    setActiveStep,
    geoJsonStatistic,
    setShowGlobe,
    showGlobe,
  } = useQueryBuilder();

  const dispatchSidebarState = useCallback(
    function (args) {
      dispatch(setSidebarOpen(args));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(setActiveTab(1));
    if (activeStep === 2 && visualizationLoaded) {
      setActiveStep(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStructure, visualizationLoaded, activeStep]);

  function closeSidebar() {
    if (sidebarOpen) {
      dispatchSidebarState(false);
    }
  }

  function getActiveStepNode() {
    switch (activeStep) {
      case 3:
      case 2:
        return (
          <GeoVisualization
            showLoadingScreen={activeStep === 2}
            geoJsonFromSelectedStatistic={geoJsonStatistic}
            showGlobe={showGlobe}
          />
        );
      case 1:
        return (
          <VisualizationSelector
            setActiveStep={setActiveStep}
            useQueryParams={false}
            setShowGlobe={setShowGlobe}
          />
        );
      case 0:
      default:
        return (
          <FilterSelector
            selectedFilterStructure={selectedFilterStructure}
            setSelectedFilterStructure={setSelectedFilterStructure}
            filterStructure={filterStructure}
          />
        );
    }
  }

  return (
    <Container
      disableGutters
      onClick={closeSidebar}
      className={clsx("content", sidebarOpen && "content-shift")}
    >
      <div className="text-box">
        <Typography variant="h4" color="textSecondary">
          Build your own queries (Alpha)
        </Typography>
        <Typography variant="body1" color="textSecondary">
          This feature heavily relies on the UIS API. Since UIS is during a
          migration phase, this feature might not work. In addition multi
          dimension observations are currently not supported. E.g. an
          observation between 2017 and 2018 is already multi-dimensional.
        </Typography>
      </div>
      <StatisticStepperQueryBuilder
        isFilterValid={isFilterValid}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      {getActiveStepNode()}
    </Container>
  );
}
