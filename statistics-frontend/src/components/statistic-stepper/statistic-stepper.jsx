import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    width: "100%",
  },
  stepNavigationButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

function getSteps() {
  return [
    "Select educational statistic",
    "Choose a visualization",
    "Wait for visualization to be ready...",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Swipe and choose a statistic";
    case 1:
      return "Choose map or globe mode";
    case 2:
      return "...we are already there";
    default:
      return "Unknown step";
  }
}

export default function StatisticStepper({ children }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {children}
      <div>
        {activeStep === steps.length ? (
          <div>
            <Button
              onClick={handleReset}
              className={classes.button}
              variant="outlined"
            >
              Reset
            </Button>
          </div>
        ) : (
          <>
            <Typography className={classes.instructions} color="secondary">
              {getStepContent(activeStep)}
            </Typography>
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
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
