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

const cookieKey = "cookieLawAccepted";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AppDescriptionModal() {
  const [item, setValue] = useCookie(cookieKey);
  const [open, setOpen] = useState(!item);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = () => {
    setOpen(false);
    setValue(true);
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
      <DialogTitle id="dialog-title">Eduinsights - how it works</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          To enable you the best surfing experience, we are using cookies. By
          proceeding you agree on our cookie policy{" "}
          <span role="img" aria-labelledby="cookie">
            🍪
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          className="primary-button"
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
}
