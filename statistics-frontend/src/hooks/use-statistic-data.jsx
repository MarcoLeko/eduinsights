import { useCallback, useEffect, useState } from "react";
import {
  getMapStatisticsById,
  getMapStatisticsList,
} from "../components/shared/thunks";
import { receiveMessageInterceptor } from "../context/alert-actions";
import * as topojson from "topojson-client";
import { useAlertContext } from "./use-alert-context";
import { useStatisticStepListener } from "./use-statistic-step-listener";

export function useStatisticData(geoJSONRef = null) {
  const { queryParams } = useStatisticStepListener();
  const [selectedStatistic, setSelectedStatistic] = useState(
    queryParams.statistic
  );
  const [statisticsList, setStatisticsList] = useState([]);
  const { dispatch } = useAlertContext();
  const [
    geoJsonFromSelectedStatistic,
    setGeoJsonFromSelectedStatistic,
  ] = useState({
    key: null,
    description: null,
    startYear: null,
    endYear: null,
    type: null,
    evaluationType: null,
    evaluation: [],
    features: [],
  });

  const fetchMapStatisticsById = useCallback(() => {
    getMapStatisticsById({ key: selectedStatistic })
      .then((topoJson) => {
        const {
          description,
          startYear,
          endYear,
          key,
          evaluationType,
          evaluation,
        } = topoJson;
        const topoJson2GeoJson = topojson.feature(topoJson, "countries");

        setGeoJsonFromSelectedStatistic({
          ...topoJson2GeoJson,
          key,
          description,
          startYear,
          endYear,
          evaluationType,
          evaluation,
        });
        if (geoJSONRef) {
          geoJSONRef.current.leafletElement
            .clearLayers()
            .addData(topoJson2GeoJson);
        }
      })
      .catch((e) => {
        dispatch(receiveMessageInterceptor(e));
      });
  }, [dispatch, geoJSONRef, selectedStatistic]);

  const fetchInitialMapStatistics = useCallback(() => {
    getMapStatisticsList()
      .then((list) => {
        setStatisticsList(list.statistics);
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
  }, [dispatch]);

  useEffect(() => {
    if (!statisticsList.length) {
      fetchInitialMapStatistics();
    }
    if (selectedStatistic) {
      fetchMapStatisticsById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatistic]);

  return {
    geoJsonFromSelectedStatistic,
    statisticsList,
    selectedStatistic,
    setSelectedStatistic,
    fetchInitialMapStatistics,
  };
}
