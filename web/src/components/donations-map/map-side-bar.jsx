import React, { useState } from "react";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { ReactComponent as Moon } from "../../assets/moon.svg";
import { ReactComponent as Sun } from "../../assets/sun.svg";
import { FormControlLabel, makeStyles, Switch } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";

const maxDrawerWidth = 480;
const drawerWidth = "calc(97.5% - 49px)";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    minWidth: 48,
    width: 48,
    height: 56,
    position: "absolute",
    background: "#fff",
    borderRadius: 0,
    zIndex: 9999,
    opacity: 0.75,
    right: -49,
  },
  spacerDiv: {
    width: 0,
    position: "relative",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  spacerDivOpen: {
    width: drawerWidth,
    maxWidth: maxDrawerWidth,
    position: "relative",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paperAnchorLeft: { left: "unset" },
  drawer: {
    width: drawerWidth,
    maxWidth: maxDrawerWidth,
    flexShrink: 0,
    display: "flex",
    height: "inherit",
    background: theme.palette.paper,
    whiteSpace: "nowrap",
    zIndex: 9999,
  },
  drawerOpen: {
    width: drawerWidth,
    maxWidth: maxDrawerWidth,
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
        <Button
          variant="contained"
          className={classes.button}
          disableFocusRipple
          onClick={toggleSidebar.bind(this)}
        >
          {open ? <ArrowBackIosRoundedIcon /> : <ArrowForwardIosRoundedIcon />}
        </Button>
      </div>

      <Drawer
        variant="permanent"
        elevation={16}
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
                checkedIcon={<Moon height={20} />}
                icon={<Sun height={20} />}
                checked={mapMode === "dark"}
                onChange={toggleMapMode}
                color="primary"
              />
            }
            label={`Switch to ${mapMode === "light" ? "dark" : "light"} mode`}
          />
        </div>
      </Drawer>
    </>
  );
}

export default MapSideBar;
