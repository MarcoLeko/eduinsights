import { useCallback, useEffect, useState } from "react";
import {
  getMapStatisticsById,
  getMapStatisticsList,
} from "../components/shared/thunks";
import { receiveMessageInterceptor } from "../context/alert-actions";
import * as topojson from "topojson-client";
import { useAlertContext } from "./use-alert-context";

export function useMapStatistics(geoJSONRef = null) {
  const [selectedStatistic, setSelectedStatistic] = useState(null);
  const [allMapStatistics, setAllMapStatistics] = useState(null);
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

  const fetchMapStatisticsById = useCallback(
    (key) => {
      getMapStatisticsById({ key })
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
          geoJSONRef.current.leafletElement
            .clearLayers()
            .addData(topoJson2GeoJson);
        })
        .catch((e) => {
          dispatch(receiveMessageInterceptor(e));
        });
    },
    [dispatch, geoJSONRef]
  );

  const fetchInitialMapStatistics = useCallback(() => {
    getMapStatisticsList()
      .then((list) => {
        setAllMapStatistics(list.statistics);
        setSelectedStatistic(list.statistics[0].key);
        return list.statistics[0].key;
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)))
      .then((key) => fetchMapStatisticsById(key));
  }, [dispatch, fetchMapStatisticsById]);

  useEffect(() => {
    fetchInitialMapStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    geoJsonFromSelectedStatistic,
    allMapStatistics,
    selectedStatistic,
    setSelectedStatistic,
    fetchMapStatisticsById,
    fetchInitialMapStatistics,
  };
}
