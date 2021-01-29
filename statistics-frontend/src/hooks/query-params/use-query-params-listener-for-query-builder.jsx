import { useHistory } from "react-router-dom";
import qs from "query-string";
import { useQueryParams } from "./use-query-params";

export function useQueryParamsListenerForQueryBuilder() {
  const history = useHistory();
  const { queryParams, addNextQueryParam, resetQueryParams } = useQueryParams();

  const removeLastQueryParam = (activeStep) => {
    history.push({
      search: qs.stringify(
        {
          q: activeStep === 1 ? undefined : queryParams.q,
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
