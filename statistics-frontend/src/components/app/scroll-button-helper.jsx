import { Fab, useTheme, Zoom } from "@material-ui/core";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import React from "react";
import { useScrollYObserver } from "../../hooks/use-scroll-y-observer";
import { useAppStyles } from "./app-styles";

export function ScrollButtonHelper({ condition }) {
  const theme = useTheme();
  const classes = useAppStyles();
  const { isScrolledToBottom } = useScrollYObserver(condition);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  return (
    <Zoom
      in={condition}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${condition ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Fab
        aria-label={`Scroll ${isScrolledToBottom ? "up" : "down"}`}
        className={classes.fab}
        color="primary"
        onClick={() =>
          window.scroll({
            top: isScrolledToBottom ? 0 : document.body.scrollHeight,
            behavior: "smooth",
          })
        }
        timeout={transitionDuration}
        unmountOnExit
      >
        {isScrolledToBottom ? <UpIcon /> : <DownIcon />}
      </Fab>
    </Zoom>
  );
}
