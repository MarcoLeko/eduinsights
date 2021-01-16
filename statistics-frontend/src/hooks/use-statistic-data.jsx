import { useCallback, useEffect, useState } from "react";
import {
  getMapStatisticsById,
  getMapStatisticsList,
} from "../components/shared/thunks";
import { receiveMessageInterceptor } from "../context/alert-actions";
import * as topojson from "topojson-client";
import { useAlertContext } from "./use-alert-context";
import { useQueryParamsListener } from "./use-query-params-listener";

export function useStatisticData() {
  const { queryParams } = useQueryParamsListener();
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
        } = topoJson;
        const topoJson2GeoJson = topojson.feature(topoJson, "countries");

        setGeoJsonFromSelectedStatistic({
          ...topoJson2GeoJson,
          key,
          description,
          startYear,
          endYear,
          evaluationType,
        });
      })
      .catch((e) => {
        dispatch(receiveMessageInterceptor(e));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatistic]);

  const fetchInitialMapStatistics = useCallback(() => {
    getMapStatisticsList()
      .then((list) => {
        setStatisticsList(list.statistics);
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
