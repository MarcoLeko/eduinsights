import React, { useState } from "react";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { FormControlLabel, makeStyles, Switch } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";

const maxDrawerWidth = 480;

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    minWidth: 48,
    width: 48,
    height: 56,
    position: "relative",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: 4,
    zIndex: 9999,
  },
  spacerDiv: {
    width: 0,
    position: "relative",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    height: "100%",
  },
  spacerDivOpen: {
    maxWidth: maxDrawerWidth,
    position: "relative",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paperAnchorLeft: { border: 0 },
  drawer: {
    maxWidth: maxDrawerWidth,
    flexShrink: 0,
    display: "flex",
    height: "inherit",
    whiteSpace: "nowrap",
    zIndex: 9999,
  },
  drawerOpen: {
    position: "relative",
    maxWidth: maxDrawerWidth,
    width: 250,
    background: "rgba(255, 255, 255, 0.8)",
    height: "inherit",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sideBarContent: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    height: "inherit",
    position: "relative",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0,
  },
}));

function MapSideBar({ toggleMapMode, mapMode }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function toggleSidebar() {
    setOpen(!open);
  }

  return (
    <>
      <div
        className={clsx(classes.spacerDiv, {
          [classes.spacerDivOpen]: open,
        })}
      >
        <Drawer
          variant="permanent"
          elevation={0}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
            paperAnchorLeft: classes.paperAnchorLeft,
          }}
        >
          <div className={classes.sideBarContent}>
            <FormControlLabel
              control={
                <Switch
                  size="medium"
                  checked={mapMode === "dark"}
                  onChange={toggleMapMode}
                  color="primary"
                />
              }
              label={`Switch to ${mapMode === "light" ? "dark" : "light"} mode`}
            />
          </div>
        </Drawer>
        <Button
          variant="contained"
          className={classes.button}
          disableFocusRipple
          onClick={toggleSidebar.bind(this)}
        >
          {open ? <ArrowBackIosRoundedIcon /> : <ArrowForwardIosRoundedIcon />}
        </Button>
      </div>
    </>
  );
}

export default MapSideBar;
