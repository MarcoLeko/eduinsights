import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { useStatisticData } from "../../hooks/use-statistic-data";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    position: "sticky",
    top: 117,
    zIndex: 1,
    height: 128,
    background: theme.palette.background.default,
    [theme.breakpoints.down("xs")]: {
      top: 52,
    },
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
    padding: theme.spacing(1, 0),
  },
}));

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
}) {
  const classes = useStyles();
  const { statisticsList } = useStatisticData();

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
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        classes={{ root: classes.paper }}
      >
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
          onClick={() => removeLastQueryParam(activeStep)}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={resetQueryParams}
          className={classes.button}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
