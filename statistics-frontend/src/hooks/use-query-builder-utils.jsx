import { useCallback, useState } from "react";
import { receiveMessageInterceptor } from "../context/alert-actions";
import { useAlertContext } from "./use-alert-context";
import {
  getFilter,
  getStatisticWithQuery,
  validateClientFilter,
} from "../helper/services";
import { useQueryParams } from "./use-query-params";
import * as topojson from "topojson-client";

function createClientFilterFromQueryParams(filterStructure, params) {
  return filterStructure?.dimensions?.observation.reduce(
    (acc, item) =>
      Object.keys(params).some((key) => key === item.id)
        ? {
            ...acc,
            [item.id]: {
              value: params[item.id],
              position: item.keyPosition,
            },
          }
        : acc,
    {}
  );
}

const defaultGeoJsonStatistic = {
  key: null,
  description: null,
  type: null,
  unit: null,
  features: null,
  amountOfCountries: 0,
};

export function useQueryBuilderUtils() {
  const { dispatch } = useAlertContext();
  const { queryParams } = useQueryParams();

  const [filterStructure, setFilterStructure] = useState([]);
  const [isFilterValid, setIsFilterValid] = useState(false);
  const [geoJsonStatistic, setGeoJsonStatistic] = useState(
    defaultGeoJsonStatistic
  );

  const fetchGeoJsonStatisticFromFilter = useCallback(
    (filterStructure) => {
      getStatisticWithQuery(
        createClientFilterFromQueryParams(filterStructure, queryParams)
      )
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
    },
    [queryParams, dispatch]
  );

  const syncFilter = useCallback(
    (filterStructure) => {
      const clientFilter = createClientFilterFromQueryParams(
        filterStructure,
        queryParams
      );
      const isFilterActive = Boolean(Object.keys(clientFilter).length);
      const validatePromise = isFilterActive
        ? validateClientFilter(clientFilter)
        : Promise.resolve({ isFilterValid: false });

      validatePromise
        .then((response) => {
          setIsFilterValid(response.isFilterValid);
          return response.isFilterValid;
        })
        .then((isClientFilterValid) =>
          isClientFilterValid
            ? fetchGeoJsonStatisticFromFilter(filterStructure)
            : setGeoJsonStatistic(defaultGeoJsonStatistic)
        )
        .catch((e) => dispatch(receiveMessageInterceptor(e)));
    },
    [queryParams, dispatch, fetchGeoJsonStatisticFromFilter]
  );

  const fetchFilterStructure = useCallback(() => {
    getFilter(createClientFilterFromQueryParams(filterStructure, queryParams))
      .then((response) => {
        setFilterStructure(response);
        return response;
      })
      .then((filterStructure) => syncFilter(filterStructure))
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
  }, [queryParams, filterStructure, dispatch, syncFilter]);

  const resetQueryBuilderData = useCallback(() => {
    getFilter(createClientFilterFromQueryParams([], queryParams)).then(
      (response) => {
        setFilterStructure(response);
        setGeoJsonStatistic(defaultGeoJsonStatistic);
        setIsFilterValid(false);
      }
    );
  }, [queryParams]);

  return {
    filterStructure,
    isFilterValid,
    geoJsonStatistic,
    resetQueryBuilderData,
    fetchFilterStructure,
  };
}
