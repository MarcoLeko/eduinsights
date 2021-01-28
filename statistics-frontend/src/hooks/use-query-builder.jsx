import { useCallback, useEffect, useState } from "react";
import { getDataStructureForQuery } from "../components/shared/thunks";
import { receiveMessageInterceptor } from "../context/alert-actions";
import { useAlertContext } from "./use-alert-context";

export function useQueryBuilder() {
  const [filterStructure, setFilterStructure] = useState([]);
  const [selectedFilterStructure, setSelectedFilterStructure] = useState([]);
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

  useEffect(() => {
    if (!filterStructure.length) {
      fetchQueryBuilderFilterStructure();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    filterStructure,
    selectedFilterStructure,
    setSelectedFilterStructure,
  };
}
