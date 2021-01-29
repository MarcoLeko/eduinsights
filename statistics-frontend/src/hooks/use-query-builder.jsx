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

export function useQueryBuilder() {
  const { dispatch } = useAlertContext();
  const {
    getQueryParamsObjForQueryBuilder,
  } = useQueryParamsListenerForQueryBuilder();
  const [selectedFilterStructure, setSelectedFilterStructure] = useState(
    getQueryParamsObjForQueryBuilder()
  );

  const [filterStructure, setFilterStructure] = useState([]);
  const [isFilterValid, setIsFilterValid] = useState(false);
  const [showGlobe, setShowGlobe] = useState(false);
  const [geoJsonStatistic, setGeoJsonStatistic] = useState({
    description: null,
    key: null,
    type: null,
    features: [],
  });
  const [activeStep, setActiveStep] = useState(0);

  const fetchGeoJsonStatisticFromFilter = useCallback(() => {
    getStatisticForQuery(selectedFilterStructure)
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
  }, []);

  const fetchQueryBuilderFilterStructure = useCallback(() => {
    getDataStructureForQuery()
      .then((response) => {
        const flattenedResponse = response.flat(1);
        setSelectedFilterStructure(
          flattenedResponse.reduce((prev, filter, i) => {
            const filterIndex = Object.keys(selectedFilterStructure).findIndex(
              (item) => item === flattenedResponse[i].id
            );
            if (filterIndex > -1) {
              prev[filter.id] = Object.values(selectedFilterStructure)[
                filterIndex
              ];
            } else {
              prev[filter.id] = "";
            }
            return prev;
          }, {})
        );
        setFilterStructure(flattenedResponse);
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStructure]);

  const getFilterValidation = useCallback(() => {
    validateSelectedFilter(selectedFilterStructure)
      .then((response) => setIsFilterValid(response.clientFilterValid))
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilterStructure]);

  useEffect(() => {
    if (!filterStructure.length) {
      fetchQueryBuilderFilterStructure();
    }

    if (selectedFilterStructure.length) {
      getFilterValidation();
    }

    if (isFilterValid && activeStep > 0) {
      fetchGeoJsonStatisticFromFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilterStructure, activeStep]);

  return {
    filterStructure,
    selectedFilterStructure,
    setSelectedFilterStructure,
    isFilterValid,
    activeStep,
    setActiveStep,
    showGlobe,
    setShowGlobe,
    geoJsonStatistic,
  };
}
