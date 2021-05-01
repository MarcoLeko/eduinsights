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

function createFilterPayloadForDataStructure(structure, params) {
  const payload =
    structure.dimensions?.observation?.map((item) => {
      if (Object.keys(params).some((key) => key === item.id)) {
        return `${params[item.id]}.`;
      }

      return ".";
    }) || [];

  if (payload.length < 22) {
    return [
      ...payload,
      ...new Array(21 - payload.length).fill(".", payload.length, 22),
    ];
  }

  return payload;
}

function createFilterPayloadForGeoJsonData(structure, params) {
  return structure.dimensions.observation.reduce((prev, curr) => {
    if (Object.keys(params).some((key) => key === curr.id)) {
      prev[curr.id] = params[curr.id];
    } else {
      prev[curr.id] = "";
    }
    return prev;
  }, {});
}

const initialGeoJsonStatistic = {
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
    initialGeoJsonStatistic
  );

  const fetchGeoJsonStatisticFromFilter = useCallback(
    (filterStructure) => {
      getStatisticWithQuery(
        createFilterPayloadForGeoJsonData(filterStructure, queryParams)
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
      validateClientFilter(
        createFilterPayloadForGeoJsonData(filterStructure, queryParams)
      )
        .then((response) => {
          setIsFilterValid(response.clientFilterValid);
          return response.clientFilterValid;
        })
        .then((isClientFilterValid) =>
          isClientFilterValid
            ? fetchGeoJsonStatisticFromFilter(filterStructure)
            : setGeoJsonStatistic(initialGeoJsonStatistic)
        )
        .catch((e) => dispatch(receiveMessageInterceptor(e)));
    },
    [queryParams, dispatch, fetchGeoJsonStatisticFromFilter]
  );

  const fetchFilterStructure = useCallback(() => {
    getFilter(createFilterPayloadForDataStructure(filterStructure, queryParams))
      .then((response) => {
        setFilterStructure(response);
        return response;
      })
      .then((filterStructure) => syncFilter(filterStructure))
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
  }, [queryParams, filterStructure, dispatch, syncFilter]);

  const resetQueryBuilderData = useCallback(() => {
    getFilter(createFilterPayloadForDataStructure([], queryParams)).then(
      (response) => {
        setFilterStructure(response);
        setGeoJsonStatistic(initialGeoJsonStatistic);
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
