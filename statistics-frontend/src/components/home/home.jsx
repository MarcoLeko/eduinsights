import React, { useCallback, useEffect, useState } from "react";
import HomeDescription from "../home-description/home-description";
import { useUiContext } from "../../hooks/use-ui-context";
import StatisticStepper from "../statistic-stepper/statistic-stepper";
import { VisualizationSelector } from "../visualization-selector/visualization-selector";
import { setActiveTab, setShowRecentQueries } from "../../context/ui-actions";
import { GeoVisualization } from "../geo-visualization/geo-visualization";
import { useQueryParams } from "../../hooks/use-query-params";
import { visualizationModes } from "../shared/visualization-modes";
import { StatisticSelector } from "../statistic-selector/statistic-selector";
import { getMapStatisticsById } from "../../helper/services";
import * as topojson from "topojson-client";
import { receiveMessageInterceptor } from "../../context/alert-actions";
import { defaultGeoJsonStatistic } from "../../helper/default-geo-json-statistic";

export function Home() {
  const { dispatch, isVisualizationLoaded } = useUiContext();
  const {
    queryParams,
    addQueryParam,
    removeLastQueryParam,
    resetQueryParams,
  } = useQueryParams();

  const getStep = () => {
    if (
      queryParams.statistic &&
      queryParams.visualization &&
      isVisualizationLoaded
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
  };

  const [activeStep, setActiveStep] = useState(getStep());
  const [selectedStatistic, setSelectedStatistic] = useState(
    queryParams.statistic
  );
  const [
    geoJsonFromSelectedStatistic,
    setGeoJsonFromSelectedStatistic,
  ] = useState(defaultGeoJsonStatistic);

  const fetchMapStatisticsById = useCallback(() => {
    getMapStatisticsById(selectedStatistic)
      .then((topoJson) => {
        const { description, key, unit, amountOfCountries } = topoJson;

        const topoJson2GeoJson = topojson.feature(topoJson, "countries");

        setGeoJsonFromSelectedStatistic({
          key,
          description,
          unit,
          amountOfCountries,
          ...topoJson2GeoJson,
        });
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatistic]);

  const onStatisticClick = (statistic) => {
    addQueryParam({ statistic: statistic.key });
    setSelectedStatistic(statistic.key);
  };

  const onVisualizationClick = (visualization) => {
    addQueryParam({ visualization: visualization.key });
  };

  const getActiveStepNode = () => {
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
        return (
          <VisualizationSelector
            onVisualizationClick={onVisualizationClick}
            visualizations={visualizationModes}
          />
        );
      case 0:
      default:
        return <StatisticSelector onStatisticClick={onStatisticClick} />;
    }
  };

  useEffect(() => {
    dispatch(setActiveTab(0));
    dispatch(setShowRecentQueries(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveStep(getStep());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams, isVisualizationLoaded]);

  useEffect(() => {
    if (selectedStatistic) {
      fetchMapStatisticsById();
    }
  }, [selectedStatistic, fetchMapStatisticsById]);

  return (
    <>
      <StatisticStepper
        activeStep={activeStep}
        onClickBack={removeLastQueryParam}
        onClickReset={resetQueryParams}
      />
      {getActiveStepNode()}
      <HomeDescription />
    </>
  );
}
