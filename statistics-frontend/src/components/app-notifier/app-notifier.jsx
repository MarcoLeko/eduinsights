import { Slide } from "@material-ui/core";
import React from "react";
import { clearMessage } from "../../context/alert-actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { useAlertContext } from "../../hooks/use-alert-context";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    padding: theme.spacing(0, 2),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  },
}));

function AppNotifier() {
  const classes = useStyles();
  const { message, dispatch } = useAlertContext();

  function handleClose() {
    dispatch(clearMessage());
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(message)}
      autoHideDuration={4000}
      onClose={handleClose.bind(this)}
      TransitionComponent={Slide}
    >
      <SnackbarContent
        className={classes.root}
        aria-describedby="message-id"
        message={<span id="message-id">{message}</span>}
      />
    </Snackbar>
  );
}

export default AppNotifier;
