import clsx from "clsx";
import { Container, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useUiContext } from "../../hooks/use-ui-context";
import { setActiveTab, setSidebarOpen } from "../../context/ui-actions";
import "./query-builder.scss";
import { useQueryFilter } from "../../hooks/use-query-filter";
import { FilterSelector } from "../filter-selector/filter-selector";
import { VisualizationSelector } from "../visualization-selector/visualization-selector";
import { GeoVisualization } from "../geo-visualization/geo-visualization";
import { useQueryParams } from "../../hooks/use-query-params";
import StatisticStepper from "../statistic-stepper/statistic-stepper";

export function QueryBuilder() {
  const { sidebarOpen, dispatch, visualizationLoaded } = useUiContext();
  const { filterStructure, isFilterValid, geoJsonStatistic } = useQueryFilter();
  const {
    queryParams,
    addNextQueryParam,
    resetQueryParams,
    removeLastQueryParam,
  } = useQueryParams();

  const [activeStep, setActiveStep] = useState(getStep());

  function getStep() {
    if (
      isFilterValid &&
      queryParams.ready &&
      queryParams.visualization &&
      visualizationLoaded
    ) {
      return 3;
    }

    if (queryParams.ready && isFilterValid && queryParams.visualization) {
      return 2;
    }

    if (isFilterValid && queryParams.ready) {
      return 1;
    }

    return 0;
  }

  const dispatchSidebarState = useCallback(
    function (args) {
      dispatch(setSidebarOpen(args));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(setActiveTab(1));
    setActiveStep(getStep());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visualizationLoaded, isFilterValid, geoJsonStatistic]);

  function closeSidebar() {
    if (sidebarOpen) {
      dispatchSidebarState(false);
    }
  }

  function getActiveStepNode() {
    const showGlobe = queryParams.visualization === "globe";

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
        return <VisualizationSelector addNextQueryParam={addNextQueryParam} />;
      case 0:
      default:
        return (
          <FilterSelector
            queryParams={queryParams}
            filterStructure={filterStructure}
            addNextQueryParam={addNextQueryParam}
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
          Build your own queries
        </Typography>
        <Typography variant="body1" color="textSecondary">
          This feature heavily relies on the UIS API. Since UIS is during a
          migration phase, this feature might not work. In addition multi
          dimension observations are currently not supported. E.g. an
          observation between 2017 and 2018 is already multi-dimensional.
        </Typography>
      </div>
      <StatisticStepper
        isFilterValid={isFilterValid}
        activeStep={activeStep}
        resetQueryParams={resetQueryParams}
        addNextQueryParam={addNextQueryParam}
        removeLastQueryParam={removeLastQueryParam}
        isStepperForQueryBuilder={true}
        amountOfCountries={geoJsonStatistic.amountOfCountries}
      />
      {getActiveStepNode()}
    </Container>
  );
}
