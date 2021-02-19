import { useCallback, useState } from "react";
import { receiveMessageInterceptor } from "../context/alert-actions";
import { useAlertContext } from "./use-alert-context";
import {
  getDataStructureForQuery,
  getStatisticWithQuery,
  validateSelectedFilter,
} from "../services";
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

export function useQueryBuilderUtils() {
  const { dispatch } = useAlertContext();
  const { queryParams } = useQueryParams();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams, filterStructure]);

  const fetchFilterStructure = useCallback(() => {
    getDataStructureForQuery(
      createFilterPayloadForDataStructure(filterStructure, queryParams)
    )
      .then((response) => {
        const filterStructure = response.structure;
        setFilterStructure(filterStructure);
        return filterStructure;
      })
      .then((filterStructure) => syncFilter(filterStructure))
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams, filterStructure]);

  const resetQueryBuilderData = useCallback(() => {
    fetchFilterStructure().then(() =>
      setGeoJsonStatistic({
        key: null,
        description: null,
        type: null,
        unit: null,
        features: null,
        amountOfCountries: 0,
      }).then(() => setIsFilterValid(false))
    );
  }, [fetchFilterStructure]);

  const syncFilter = useCallback(
    (structure) => {
      validateSelectedFilter(
        createFilterPayloadForGeoJsonData(structure, queryParams)
      )
        .then((response) => {
          setIsFilterValid(response.clientFilterValid);
          return response.clientFilterValid;
        })
        .then((isClientFilterValid) =>
          isClientFilterValid
            ? fetchGeoJsonStatisticFromFilter()
            : setGeoJsonStatistic({
                key: null,
                description: null,
                type: null,
                unit: null,
                features: null,
                amountOfCountries: 0,
              })
        )
        .catch((e) => dispatch(receiveMessageInterceptor(e)));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryParams]
  );

  return {
    filterStructure,
    isFilterValid,
    geoJsonStatistic,
    resetQueryBuilderData,
    fetchFilterStructure,
  };
}
