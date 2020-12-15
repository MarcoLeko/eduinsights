import { useCallback, useEffect, useState } from "react";
import { getMapStatisticsById, getMapStatisticsList } from "../store/thunks";
import { receiveMessageInterceptor } from "../store/alert/alert-actions";
import { useDispatch } from "react-redux";

const useMapStatistics = (geoJSONRef) => {
  const [selectedStatistics, setSelectedStatistics] = useState(null);
  const [allMapStatistics, setAllMapStatistics] = useState([]);
  const [geoJSON, setGeoJSON] = useState({
    type: "",
    features: [],
  });

  const dispatch = useDispatch();

  const fetchMapStatisticsById = useCallback(
    (type) => {
      getMapStatisticsById({ type })
        .then((result) => {
          setGeoJSON(result);
          geoJSONRef.current.leafletElement.clearLayers().addData(result);
        })
        .catch((e) => dispatch(receiveMessageInterceptor(e)));
    },
    [dispatch, geoJSONRef]
  );

  const fetchInitialMapStatistics = useCallback(() => {
    getMapStatisticsList()
      .then((list) => {
        setAllMapStatistics(list.statistics);
        setSelectedStatistics(list.statistics[0]);
        return list.statistics[0];
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)))
      .then((type) => fetchMapStatisticsById(type));
  }, [dispatch, fetchMapStatisticsById]);

  useEffect(() => {
    fetchInitialMapStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    geoJSON,
    allMapStatistics,
    selectedStatistics,
    fetchMapStatisticsById,
    fetchInitialMapStatistics,
  };
};

export { useMapStatistics };
