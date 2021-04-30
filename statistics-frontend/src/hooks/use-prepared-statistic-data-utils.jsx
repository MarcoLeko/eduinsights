import { useCallback, useEffect, useState } from "react";
import { receiveMessageInterceptor } from "../context/alert-actions";
import * as topojson from "topojson-client";
import { useAlertContext } from "./use-alert-context";
import { getMapStatisticsById, getMapStatisticsList } from "../helper/services";
import { useQueryParams } from "./use-query-params";

export function usePreparedStatisticDataUtils() {
  const { queryParams } = useQueryParams();
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
    type: null,
    unit: null,
    features: null,
    amountOfCountries: null,
  });

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
