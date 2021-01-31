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

export function useQueryFilter() {
  const { dispatch } = useAlertContext();
  const {
    addNextQueryParam,
    queryParams,
    getParamValuesForQueryBuilder,
    getQueryParamsWithoutVisualization,
  } = useQueryParams();

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
    getStatisticForQuery(getQueryParamsWithoutVisualization(queryParams))
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
  }, [queryParams]);

  const fetchFilterStructure = useCallback(() => {
    getDataStructureForQuery(getParamValuesForQueryBuilder())
      .then((response) => {
        const filterStructure = response.structure.dimensions.observation;
        addNextQueryParam(
          mapFilterStructureToCurrentClientFilter(filterStructure, queryParams)
        );
        setFilterStructure(filterStructure);
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const syncFilter = useCallback(
    () => {
      Promise.resolve(fetchFilterStructure())
        .then(() =>
          validateSelectedFilter(
            getQueryParamsWithoutVisualization(queryParams)
          )
        )
        .then((response) => {
          setIsFilterValid(response.clientFilterValid);
          return response.clientFilterValid;
        })
        .then((isClientFilterValid) =>
          isClientFilterValid
            ? fetchGeoJsonStatisticFromFilter()
            : Promise.resolve()
        )
        .catch((e) => dispatch(receiveMessageInterceptor(e)));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [queryParams]
  );

  const syncFilterParams = useCallback(() => {
    if (filterStructure) {
      addNextQueryParam(
        mapFilterStructureToCurrentClientFilter(filterStructure, queryParams)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  useEffect(() => {
    fetchFilterStructure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    syncFilter();
    syncFilterParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return {
    filterStructure,
    isFilterValid,
    geoJsonStatistic,
  };
}
