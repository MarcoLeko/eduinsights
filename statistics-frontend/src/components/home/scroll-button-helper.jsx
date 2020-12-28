import { Fab, useTheme, Zoom } from "@material-ui/core";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import React from "react";
import { useScrollYObserver } from "../../hooks/use-scroll-y-observer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    zIndex: 9999,
    bottom: theme.spacing(2),
    left: "calc(50% - 20px)",
  },
}));

// TODO: fix scroll button behaviour to map - currently only scrolls to bottom
export function ScrollButtonHelper({ show }) {
  const theme = useTheme();
  const classes = useStyles();
  const { isScrolledToBottom } = useScrollYObserver(show);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  return (
    <Zoom
      in={show}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${show ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Fab
        aria-label={`Scroll ${isScrolledToBottom ? "up" : "down"}`}
        className={classes.fab}
        color="primary"
        size={"small"}
        onClick={() =>
          window.scroll({
            top: isScrolledToBottom ? 0 : document.body.scrollHeight,
            behavior: "smooth",
          })
        }
        timeout={transitionDuration}
      >
        {isScrolledToBottom ? <UpIcon /> : <DownIcon />}
      </Fab>
    </Zoom>
  );
}
