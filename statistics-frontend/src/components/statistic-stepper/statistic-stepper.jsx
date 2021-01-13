import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import "./statistic-stepper.scss";

function getStepsDescription() {
  return [
    "Select statistic",
    "Choose a visualization",
    "Finalize visualization",
  ];
}

export default function StatisticStepper({
  queryParams,
  activeStep,
  resetQueryParams,
  removeLastQueryParam,
  statisticsList,
}) {
  const isFirstStepFailed = (step) => {
    return (
      queryParams.statistic &&
      !statisticsList.some(({ key }) => key === queryParams.statistic) &&
      step === 0
    );
  };
  const isSecondStepFailed = (step) => {
    return (
      queryParams.visualization &&
      !["map", "globe"].includes(queryParams.visualization) &&
      step === 1
    );
  };

  return (
    <div className="stepper-container">
      <Stepper alternativeLabel activeStep={activeStep} className="stepper">
        {getStepsDescription().map((label, i) => {
          const labelProps = {};
          const stepProps = {};
          if (isFirstStepFailed(i)) {
            labelProps.error = true;
          }
          if (isSecondStepFailed(i)) {
            labelProps.error = true;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="step-navigation-buttons">
        <Button
          color="secondary"
          disabled={activeStep === 0}
          onClick={() => removeLastQueryParam(activeStep)}
          className="back-button"
        >
          Back
        </Button>
        <Button onClick={resetQueryParams} color="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
}
