import { useCallback, useEffect, useRef, useState } from "react";
import { getMapStatisticsById, getMapStatisticsList } from "../store/thunks";
import { receiveMessageInterceptor } from "../store/alert/alert-actions";
import { useDispatch } from "react-redux";

export function useMapStatistics(geoJSONRef) {
  const selectedStatistic = useRef(null);
  const [allMapStatistics, setAllMapStatistics] = useState(null);
  const [geoJSON, setGeoJSON] = useState({
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
        setGeoJSON(result);
        geoJSONRef.current.leafletElement.clearLayers().addData(result);
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
  }, [dispatch, geoJSONRef]);

  const fetchInitialMapStatistics = useCallback(() => {
    getMapStatisticsList()
      .then((list) => {
        console.log(list);
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
    geoJSON,
    allMapStatistics,
    selectedStatistic: selectedStatistic.current,
    fetchMapStatisticsById,
    fetchInitialMapStatistics,
  };
}
