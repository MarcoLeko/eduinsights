import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";

export function useStatisticStepListener() {
  const location = useLocation();
  const history = useHistory();
  const [queryParams, setQueryParams] = useState(qs.parse(location.search));

  const getStep = (params) => {
    if (params.statistic && params.visualization) {
      return 2;
    }

    if (params.statistic && !params.visualization) {
      return 1;
    }

    return 0;
  };
  const [activeStep, setActiveStep] = useState(getStep(queryParams));

  useEffect(() => {
    setQueryParams(qs.parse(location.search));
    setActiveStep(getStep(qs.parse(location.search)));
  }, [location.search, activeStep]);

  const handleNext = (e, key) => {
    history.push({
      search: qs.stringify(
        {
          statistic:
            activeStep === 0 || activeStep === 2 ? key : queryParams.statistic,
          visualization: activeStep === 1 ? key : queryParams.visualization,
        },
        {
          skipNull: true,
        }
      ),
    });
  };

  const handleBack = () => {
    history.push({
      search: qs.stringify(
        {
          statistic: activeStep === 1 ? undefined : queryParams.statistic,
          visualization:
            activeStep === 2 ? undefined : queryParams.visualization,
        },
        {
          skipNull: true,
        }
      ),
    });
  };

  const handleReset = () => {
    history.push({ search: qs.stringify({}) });
  };
  return {
    handleBack,
    handleNext,
    handleReset,
    queryParams,
    activeStep,
  };
}
