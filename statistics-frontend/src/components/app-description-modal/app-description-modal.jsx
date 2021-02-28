import useCookie from "../../hooks/use-cookie";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./app-description-modal.scss";
import StatisticImage from "../../assets/map-transparent-bg.png";
import { cookieKey } from "../../helper/cookie-key";
import { StatisticSelector } from "../statistic-selector/statistic-selector";
import { visualizations } from "../shared/visualization-items";
import { VisualizationSelector } from "../visualization-selector/visualization-selector";

const dialogTitles = ["How it works", "Select a visualization", "Enjoy!"];
const demoStatisticsList = [
  {
    amountOfCountries: 221,
    description: "Net enrolment rate for primary education",
    endYear: 2018,
    key: "NET_ENROLMENT_RATE_FOR_PRIMARY_EDUCATION_2018_2018",
    startYear: 2018,
    unit: "Percentage",
  },
];

const demoVisualizations = visualizations.filter((item) => item.key === "map");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppDescriptionModal() {
  const [item, setValue] = useCookie(cookieKey);
  const [open, setOpen] = useState(
    !item && process.env.NODE_ENV === "production"
  );
  const [step, setStep] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = () => {
    setOpen(false);
    setValue(true);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const CookieContent = () => (
    <>
      <DialogContentText id="dialog-description" align={"justify"}>
        Hover over the states and compare the observations. In addition, you can
        access the statistic via url or the recent queries panel.
      </DialogContentText>
      <img
        src={StatisticImage}
        className="dialog-image"
        loading="lazy"
        alt="Statistic of net enrolment of primary education"
      />
      <DialogContentText
        id="dialog-description"
        align={"justify"}
        component="div"
      >
        <Typography variant="h6" color="textPrimary" className="mt-1">
          Cookie management
        </Typography>
        To enable you the best surfing experience, we are using essential
        cookies. By proceeding you agree on our cookie policy{" "}
        <span role="img" aria-labelledby="cookie">
          🍪
        </span>
      </DialogContentText>
    </>
  );

  const SelectStatisticContent = () => (
    <>
      <DialogContentText
        id="dialog-description"
        align={"justify"}
        component="div"
      >
        Choose a statistic which you might find interesting to observe with. Pay
        attention on the effected amount of countries{" "}
        <span role="img" aria-labelledby="arrow down">
          ⬇️
        </span>
      </DialogContentText>
      <StatisticSelector
        statisticsList={demoStatisticsList}
        onStatisticClick={handleNext}
        showDemo
      />
    </>
  );
  const SelectVisualizationContent = () => (
    <>
      <VisualizationSelector
        visualizations={demoVisualizations}
        onVisualizationClick={handleNext}
        showDemo
      />
      <DialogContentText
        id="dialog-description"
        align={"justify"}
        component="div"
      >
        Select a visualization for the observation to display. For this demo
        click on the map visualization{" "}
        <span role="img" aria-labelledby="arrow down">
          ⬆️
        </span>
      </DialogContentText>
    </>
  );

  const dialogContent = [
    SelectStatisticContent(),
    SelectVisualizationContent(),
    CookieContent(),
  ];

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        Eduinsights - {dialogTitles[step]}
      </DialogTitle>
      <DialogContent>{dialogContent[step]}</DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={step < dialogTitles.length - 1}
          color="primary"
        >
          {"Accept"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
