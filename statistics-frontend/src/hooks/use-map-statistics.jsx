import { useCallback, useEffect, useState } from "react";
import { getMapStatisticsById, getMapStatisticsList } from "../store/thunks";
import { receiveMessageInterceptor } from "../store/alert/alert-actions";
import { useDispatch } from "react-redux";
import * as topojson from "topojson-client";

export function useMapStatistics(geoJSONRef = null) {
  const [selectedStatistic, setSelectedStatistic] = useState(null);
  const [allMapStatistics, setAllMapStatistics] = useState(null);
  const [
    geoJsonFromSelectedStatistic,
    setGeoJsonFromSelectedStatistic,
  ] = useState({
    key: null,
    description: null,
    startYear: null,
    endYear: null,
    type: null,
    features: [],
  });

  const dispatch = useDispatch();

  const fetchMapStatisticsById = useCallback(
    (key) => {
      getMapStatisticsById({ key })
        .then((topoJson) => {
          const { description, startYear, endYear, key } = topoJson;
          const topoJson2GeoJson = topojson.feature(topoJson, "countries");

          setGeoJsonFromSelectedStatistic({
            ...topoJson2GeoJson,
            key,
            description,
            startYear,
            endYear,
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
    fetchMapStatisticsById,
    fetchInitialMapStatistics,
  };
}
