import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { useStatisticData } from "../../hooks/use-statistic-data";
import { useStatisticStepListener } from "../../hooks/use-statistic-step-listener";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginBottom: theme.spacing(1),
    textAlign: "center",
    width: "100%",
  },
  stepNavigationButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1, 0),
  },
}));

function getStepsDescription() {
  return [
    "Select educational statistic",
    "Choose a visualization",
    "Wait for visualization to be ready...",
  ];
}

export default function StatisticStepper() {
  const classes = useStyles();
  const { statisticsList } = useStatisticData();
  const {
    handleReset,
    handleBack,
    queryParams,
    activeStep,
  } = useStatisticStepListener();

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
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep}>
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
      <div className={classes.stepNavigationButtons}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReset}
          className={classes.button}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
