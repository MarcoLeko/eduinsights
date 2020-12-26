import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";

export function useStatisticStepListener() {
  const location = useLocation();
  const history = useHistory();
  const [queryParams, setQueryParams] = useState(qs.parse(location.search));

  const getInitialStep = (params) => {
    if (params.statistic && params.visualization) {
      return 2;
    }

    if (params.statistic && !params.visualization) {
      return 1;
    }

    return 0;
  };
  const [activeStep, setActiveStep] = useState(getInitialStep(queryParams));

  useEffect(() => {
    setQueryParams(qs.parse(location.search));
    setActiveStep(getInitialStep(qs.parse(location.search)));
  }, [location.search, activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      history.push({
        search: qs.stringify(
          {
            statistic: prevActiveStep === 1 ? undefined : queryParams.statistic,
            visualization:
              prevActiveStep === 2 ? undefined : queryParams.visualization,
          },
          {
            skipNull: true,
          }
        ),
      });
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      history.push({
        search: qs.stringify(
          {
            statistic: prevActiveStep === 1 ? undefined : queryParams.statistic,
            visualization:
              prevActiveStep === 2 ? undefined : queryParams.visualization,
          },
          {
            skipNull: true,
          }
        ),
      });
      return prevActiveStep - 1;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
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
