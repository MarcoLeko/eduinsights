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
      .then((filterStructure) => {
        setFilterStructure(filterStructure.flat(1));
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
