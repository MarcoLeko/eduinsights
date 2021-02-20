import useCookie from "../../hooks/use-cookie";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./app-description-modal.scss";
import StatisticImage from "../../assets/map-transparent-bg.png";

const cookieKey = "cookieLawAccepted";
const dialogTitles = ["How it works", "Select a visualization", "Enjoy!"];

const CookieContent = () => (
  <>
    <DialogContentText id="dialog-description" align={"justify"}>
      Hover over the states and compare the observations. In addition, you can
      access the statistic via url or the recent queries panel.
    </DialogContentText>
    <img src={StatisticImage} className="dialog-image" />
    <DialogContentText id="dialog-description" align={"justify"}>
      To enable you the best surfing experience, we are using cookies. By
      proceeding you agree on our cookie policy{" "}
      <span role="img" aria-labelledby="cookie">
        🍪
      </span>
    </DialogContentText>
  </>
);

const SelectStatisticContent = () => <></>;
const SelectVisualizationContent = () => <></>;

const dialogContent = [
  SelectStatisticContent(),
  SelectVisualizationContent(),
  CookieContent(),
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AppDescriptionModal() {
  const [item, setValue] = useCookie(cookieKey);
  const [open, setOpen] = useState(!item);
  const [step, setStep] = useState(2);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
    setValue(true);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

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
          onClick={step < dialogTitles.length - 1 ? handleNext : handleClose}
          color="primary"
          variant="contained"
          className="primary-button"
        >
          {step < dialogTitles.length - 1 ? "Proceed" : "Accept"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
