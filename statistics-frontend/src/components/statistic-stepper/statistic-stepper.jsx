import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import "./statistic-stepper.scss";
import Typography from "@material-ui/core/Typography";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

function getStepsDescriptionForPreparedStatistics() {
  return ["Statistic", "Visualization", "Computation"];
}

function getStepContentForPreparedStatistics(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Choose a statistic to visualize it. The data is provided by the UIS API.";
    case 1:
      return "Choose a visualization mode";
    case 2:
      return "Wait for data to be processed...";
    default:
      return "";
  }
}

function getStepsDescriptionForQueryBuilder() {
  return ["Query", "Visualization", "Computation"];
}

function getStepContentForQueryBuilder(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Set the filters to observe your individual statistic. The data is provided by the UIS API.";
    case 1:
      return "Choose a visualization mode";
    case 2:
      return "Wait for data to be processed...";
    default:
      return "";
  }
}
export default function StatisticStepper({
  activeStep,
  onClickBack,
  onClickReset,
  onClickNext = () => null,
  isStepperForQueryBuilder = false,
  canClickOnNext,
}) {
  const stepDescription = isStepperForQueryBuilder
    ? getStepsDescriptionForQueryBuilder()
    : getStepsDescriptionForPreparedStatistics();

  return (
    <>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        className="stepper mt-2"
      >
        {stepDescription.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep !== 3 && (
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          className="step-description"
        >
          {isStepperForQueryBuilder
            ? getStepContentForQueryBuilder(activeStep)
            : getStepContentForPreparedStatistics(activeStep)}
        </Typography>
      )}
      <div className="step-navigation-buttons">
        <Button
          startIcon={<ArrowBack />}
          color="secondary"
          disabled={activeStep === 0}
          onClick={onClickBack}
          className="back-button"
        >
          Back
        </Button>
        <Button onClick={onClickReset}>Reset</Button>
        {isStepperForQueryBuilder && (
          <Button
            color="secondary"
            className="button"
            onClick={onClickNext}
            endIcon={<ArrowForward />}
            disabled={canClickOnNext}
          >
            Next
          </Button>
        )}
      </div>
    </>
  );
}
