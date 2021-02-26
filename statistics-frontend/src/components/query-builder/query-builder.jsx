import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useUiContext } from "../../hooks/use-ui-context";
import { setActiveTab, setShowRecentQueries } from "../../context/ui-actions";
import "./query-builder.scss";
import { useQueryBuilderUtils } from "../../hooks/use-query-builder-utils";
import { FilterSelector } from "../filter-selector/filter-selector";
import { VisualizationSelector } from "../visualization-selector/visualization-selector";
import { GeoVisualization } from "../geo-visualization/geo-visualization";
import { useQueryParams } from "../../hooks/use-query-params";
import StatisticStepper from "../statistic-stepper/statistic-stepper";
import { visualizations } from "../shared/visualization-items";

export default function QueryBuilder() {
  const { dispatch, isVisualizationLoaded } = useUiContext();
  const {
    filterStructure,
    isFilterValid,
    geoJsonStatistic,
    resetQueryBuilderData,
    fetchFilterStructure,
  } = useQueryBuilderUtils();
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
      isVisualizationLoaded
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

  function onClickReset() {
    resetQueryParams();
    resetQueryBuilderData();
  }

  function onClickNext() {
    addNextQueryParam({ ready: true });
  }

  function onClickBack() {
    removeLastQueryParam();
  }

  function onVisualizationClick(visualization) {
    addNextQueryParam({ visualization: visualization.key });
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
        return (
          <VisualizationSelector
            onVisualizationClick={onVisualizationClick}
            visualizations={visualizations}
          />
        );
      case 0:
      default:
        return (
          <FilterSelector
            queryParams={queryParams}
            fetchFilterStructure={fetchFilterStructure}
            filterStructure={filterStructure}
            addNextQueryParam={addNextQueryParam}
            amountOfCountries={geoJsonStatistic.amountOfCountries}
          />
        );
    }
  }

  useEffect(() => {
    fetchFilterStructure();
    dispatch(setActiveTab(1));
    dispatch(setShowRecentQueries(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveStep(getStep());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisualizationLoaded, isFilterValid, queryParams]);

  return (
    <>
      <div className="query-builder-text-box p-1">
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
        canClickOnNext={!isFilterValid || activeStep !== 0}
        activeStep={activeStep}
        onClickBack={onClickBack}
        onClickReset={onClickReset}
        onClickNext={onClickNext}
        isStepperForQueryBuilder={true}
      />
      {getActiveStepNode()}
    </>
  );
}
