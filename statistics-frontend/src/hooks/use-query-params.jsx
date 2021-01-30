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

  const getValuesFromParam = () => {
    return Object.values(
      getQueryParamsWithoutVisualization(
        qs.parse(location.search, {
          sort: false,
        })
      )
    ).map((val) => (!val ? "." : `${val}.`));
  };

  const getQueryParamsWithoutVisualization = (params) => {
    return Object.keys(params)
      .filter((key) => key !== "visualization")
      .reduce((prev, curr) => {
        prev[curr] = params[curr];
        return prev;
      }, {});
  };

  return {
    addNextQueryParam,
    resetQueryParams,
    queryParams,
    removeLastQueryParam,
    getValuesFromParam,
    getQueryParamsWithoutVisualization,
  };
}
