import { useCallback, useEffect, useState } from "react";
import { receiveMessageInterceptor } from "../context/alert-actions";
import { useAlertContext } from "./use-alert-context";
import {
  getDataStructureForQuery,
  getStatisticForQuery,
  validateSelectedFilter,
} from "../services";
import * as topojson from "topojson-client";
import { useQueryParams } from "./use-query-params";

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

const getQueryParamsObjForQueryBuilder = (params) => {
  return Object.keys(params)
    .filter((key) => key !== "visualization")
    .reduce((prev, curr) => {
      prev[curr] = params[curr];
      return prev;
    }, {});
};

export function useQueryFilter() {
  const { dispatch } = useAlertContext();
  const { addNextQueryParam, queryParams } = useQueryParams();

  const [filterStructure, setFilterStructure] = useState([]);
  const [isFilterValid, setIsFilterValid] = useState(false);
  const [geoJsonStatistic, setGeoJsonStatistic] = useState({
    key: null,
    description: null,
    type: null,
    unit: null,
    features: null,
    amountOfCountries: 0,
  });

  const fetchGeoJsonStatisticFromFilter = useCallback(() => {
    getStatisticForQuery(getQueryParamsObjForQueryBuilder(queryParams))
      .then((topoJson) => {
        const { key, description, unit, amountOfCountries } = topoJson;
        const topoJson2GeoJson = topojson.feature(topoJson, "countries");
        setGeoJsonStatistic({
          key,
          unit,
          description,
          amountOfCountries,
          ...topoJson2GeoJson,
        });
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getQueryParamsObjForQueryBuilder(queryParams)]);

  const fetchFilterStructure = useCallback(() => {
    getDataStructureForQuery()
      .then((response) => {
        const flattenedResponse = response.flat(1);
        addNextQueryParam(
          mapFilterStructureToCurrentClientFilter(
            flattenedResponse,
            getQueryParamsObjForQueryBuilder(queryParams)
          )
        );
        return flattenedResponse;
      })
      .then((flattenedResponse) => setFilterStructure(flattenedResponse))
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStructure]);

  const validateFilter = useCallback(() => {
    validateSelectedFilter(getQueryParamsObjForQueryBuilder(queryParams))
      .then((response) => setIsFilterValid(response.clientFilterValid))
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getQueryParamsObjForQueryBuilder(queryParams)]);

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
    geoJsonStatistic,
  };
}
