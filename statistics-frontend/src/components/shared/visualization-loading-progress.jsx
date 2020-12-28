import { CircularProgress } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
    zIndex: 999,
  },
}));

export function VisualizationLoadingProgress({ show }) {
  const classes = useStyles();
  return show ? (
    <CircularProgress classes={{ root: classes.root }} size={80} />
  ) : null;
}
