import { useCallback, useEffect, useRef, useState } from "react";
import { getMapStatisticsById, getMapStatisticsList } from "../store/thunks";
import { receiveMessageInterceptor } from "../store/alert/alert-actions";
import { useDispatch } from "react-redux";
import * as topojson from "topojson-client";

export function useMapStatistics(geoJSONRef) {
  const selectedStatistic = useRef(null);
  const [allMapStatistics, setAllMapStatistics] = useState(null);
  const [geoJson, setGeoJson] = useState({
    key: null,
    description: null,
    startYear: null,
    endYear: null,
    type: null,
    features: [],
  });

  const dispatch = useDispatch();

  const fetchMapStatisticsById = useCallback(() => {
    getMapStatisticsById({ key: selectedStatistic.current })
      .then((result) => {
        const convertedTopojson = topojson.feature(result, "countries");
        setGeoJson(convertedTopojson);
        geoJSONRef.current.leafletElement
          .clearLayers()
          .addData(convertedTopojson);
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
  }, [dispatch, geoJSONRef]);

  const fetchInitialMapStatistics = useCallback(() => {
    getMapStatisticsList()
      .then((list) => {
        setAllMapStatistics(list.statistics);
        selectedStatistic.current = list.statistics[0].key;
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)))
      .then(() => fetchMapStatisticsById());
  }, [dispatch, fetchMapStatisticsById]);

  useEffect(() => {
    fetchInitialMapStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchInitialMapStatistics]);

  return {
    geoJson,
    allMapStatistics,
    selectedStatistic: selectedStatistic.current,
    fetchMapStatisticsById,
    fetchInitialMapStatistics,
  };
}
