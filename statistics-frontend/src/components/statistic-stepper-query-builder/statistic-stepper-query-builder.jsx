import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ArrowBack } from "@material-ui/icons";
import "../statistic-stepper/statistic-stepper.scss";

function getStepsDescription() {
  return ["Create query", "Choose a visualization", "Finalize visualization"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Set the filters to observe your individual statistic. The data is provided by the UIS API.";
    case 1:
      return "Choose a visualization mode: 2D or 3D";
    case 2:
      return "Wait for data to be processed...";
    default:
      return "";
  }
}
export default function StatisticStepperQueryBuilder() {
  return (
    <div className="stepper-container">
      <Stepper alternativeLabel activeStep={0} className="stepper">
        {getStepsDescription().map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {0 !== 3 && (
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          className="step-description"
        >
          {getStepContent(0)}
        </Typography>
      )}
      <div className="step-navigation-buttons">
        <Button
          color="secondary"
          className="back-button"
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
        <Button color="secondary">Reset</Button>
      </div>
    </div>
  );
}
