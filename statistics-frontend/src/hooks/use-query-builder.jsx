import { useCallback, useEffect, useState } from "react";
import { receiveMessageInterceptor } from "../context/alert-actions";
import { useAlertContext } from "./use-alert-context";
import {
  getDataStructureForQuery,
  getStatisticForQuery,
  validateSelectedFilter,
} from "../services";
import * as topojson from "topojson-client";
import { useQueryParamsListenerForQueryBuilder } from "./query-params/use-query-params-listener-for-query-builder";

function mapFilterStructureToCurrentClientFilter(
  filterStructure,
  clientFilter
) {
  return filterStructure.reduce((prev, filter, i) => {
    const filterIndex = Object.keys(clientFilter).findIndex(
      (item) => item === filterStructure[i].id
    );
    if (filterIndex > -1) {
      prev[filter.id] = Object.values(clientFilter)[filterIndex];
    } else {
      prev[filter.id] = "";
    }
    return prev;
  }, {});
}

export function useQueryBuilder() {
  const { dispatch } = useAlertContext();
  const {
    addNextQueryParam,
    queryParams,
    getQueryParamsObjForQueryBuilder,
  } = useQueryParamsListenerForQueryBuilder();

  const [filterStructure, setFilterStructure] = useState([]);
  const [isFilterValid, setIsFilterValid] = useState(false);
  const [showGlobe, setShowGlobe] = useState(false);
  const [geoJsonStatistic, setGeoJsonStatistic] = useState({
    key: null,
    type: null,
    features: [],
  });

  const fetchGeoJsonStatisticFromFilter = useCallback(() => {
    getStatisticForQuery(queryParams)
      .then((topoJson) => {
        const { key } = topoJson;
        const topoJson2GeoJson = topojson.feature(topoJson, "countries");

        setGeoJsonStatistic({
          ...topoJson2GeoJson,
          key,
        });
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const fetchFilterStructure = useCallback(() => {
    getDataStructureForQuery()
      .then((response) => {
        const flattenedResponse = response.flat(1);
        addNextQueryParam(
          mapFilterStructureToCurrentClientFilter(
            flattenedResponse,
            getQueryParamsObjForQueryBuilder()
          )
        );
        return flattenedResponse;
      })
      .then((flattenedResponse) => setFilterStructure(flattenedResponse))
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStructure]);

  const validateFilter = useCallback(() => {
    validateSelectedFilter(queryParams)
      .then((response) => setIsFilterValid(response.clientFilterValid))
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  useEffect(() => {
    fetchFilterStructure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(queryParams).length) {
      validateFilter();
    }

    if (isFilterValid) {
      fetchGeoJsonStatisticFromFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return {
    filterStructure,
    isFilterValid,
    showGlobe,
    setShowGlobe,
    geoJsonStatistic,
  };
}
