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

export function ScrollButtonHelper({
  show,
  rootContainerRef,
  targetContainerRef,
}) {
  const theme = useTheme();
  const classes = useStyles();
  const { isIntersecting, scrollDirection } = useScrollYObserver(
    show,
    targetContainerRef,
    rootContainerRef
  );

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
        aria-label={`Scroll ${isIntersecting ? "up" : "down"}`}
        className={classes.fab}
        color="primary"
        size={"small"}
        onClick={() =>
          isIntersecting && scrollDirection === "toTop"
            ? window.scroll({
                top: 0,
                behavior: "smooth",
              })
            : targetContainerRef.scrollIntoView({
                block: "end",
                behavior: "smooth",
              })
        }
        timeout={transitionDuration}
      >
        {scrollDirection === "toBottom" ? <DownIcon /> : <UpIcon />}
      </Fab>
    </Zoom>
  );
}
