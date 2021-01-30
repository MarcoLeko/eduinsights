import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";

export function useQueryParams() {
  const location = useLocation();
  const history = useHistory();
  const [queryParams, setQueryParams] = useState(
    qs.parse(location.search, {
      sort: false,
    })
  );

  useEffect(() => {
    setQueryParams(qs.parse(location.search, { sort: false }));
  }, [location.search]);

  const addNextQueryParam = (newQueryParam) => {
    history.push({
      search: qs.stringify(
        {
          ...queryParams,
          ...newQueryParam,
        },
        {
          skipNull: true,
          sort: false,
        }
      ),
    });
  };

  const resetQueryParams = () => {
    history.push({ search: qs.stringify({}) });
  };

  const removeLastQueryParam = () => {
    const lastParamKey = Object.keys(queryParams).pop();
    const newQueryParams = { ...queryParams, [lastParamKey]: undefined };
    history.push({
      search: qs.stringify(newQueryParams, {
        skipNull: true,
        sort: false,
      }),
    });
  };

  return {
    addNextQueryParam,
    resetQueryParams,
    queryParams,
    removeLastQueryParam,
  };
}
