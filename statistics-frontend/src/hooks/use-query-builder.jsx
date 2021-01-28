import { useCallback, useEffect, useState } from "react";
import { receiveMessageInterceptor } from "../context/alert-actions";
import { useAlertContext } from "./use-alert-context";
import { getDataStructureForQuery, validateSelectedFilter } from "../services";

export function useQueryBuilder() {
  const [filterStructure, setFilterStructure] = useState([]);
  const [selectedFilterStructure, setSelectedFilterStructure] = useState([]);
  const [isFilterValid, setIsFilterValid] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const { dispatch } = useAlertContext();

  const fetchQueryBuilderFilterStructure = useCallback(() => {
    getDataStructureForQuery()
      .then((response) => {
        const flattenedResponse = response.flat(1);
        setSelectedFilterStructure(
          flattenedResponse.map((filter) => ({ [filter.id]: "" }))
        );
        setFilterStructure(flattenedResponse);
      })
      .catch((e) => dispatch(receiveMessageInterceptor(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFilterValidation = useCallback(() => {
    validateSelectedFilter(selectedFilterStructure).then((response) =>
      setIsFilterValid(response.clientFilterValid)
    );
  }, [selectedFilterStructure]);

  useEffect(() => {
    if (!filterStructure.length && !selectedFilterStructure.length) {
      fetchQueryBuilderFilterStructure();
    }

    if (selectedFilterStructure.length) {
      getFilterValidation();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilterStructure]);

  return {
    filterStructure,
    selectedFilterStructure,
    setSelectedFilterStructure,
    isFilterValid,
    activeStep,
    setActiveStep,
  };
}
