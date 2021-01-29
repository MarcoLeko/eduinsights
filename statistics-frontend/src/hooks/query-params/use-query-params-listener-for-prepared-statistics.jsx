import qs from "query-string";
import { useQueryParams } from "./use-query-params";
import { useHistory } from "react-router-dom";

export function useQueryParamsListenerForPreparedStatistics() {
  const history = useHistory();
  const { queryParams, addNextQueryParam, resetQueryParams } = useQueryParams();

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

  return {
    removeLastQueryParam,
    addNextQueryParam,
    resetQueryParams,
    queryParams,
  };
}
