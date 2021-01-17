import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";

export function useQueryParamsListener() {
  const location = useLocation();
  const history = useHistory();
  const [queryParams, setQueryParams] = useState(qs.parse(location.search));

  useEffect(() => {
    setQueryParams(qs.parse(location.search));
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
        }
      ),
    });
  };

  const removeLastQueryParam = (activeStep) => {
    history.push({
      search: qs.stringify(
        {
          statistic: activeStep === 1 ? undefined : queryParams.statistic,
          visualization:
            activeStep === 2 || activeStep === 3
              ? undefined
              : queryParams.visualization,
        },
        {
          skipNull: true,
        }
      ),
    });
  };

  const resetQueryParams = () => {
    history.push({ search: qs.stringify({}) });
  };

  return {
    removeLastQueryParam,
    addNextQueryParam,
    resetQueryParams,
    queryParams,
  };
}
