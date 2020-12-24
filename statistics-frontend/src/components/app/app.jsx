import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./app.scss";
import SwipeableViews from "react-swipeable-views";
import clsx from "clsx";
import ToolbarMenu from "./toolbar-menu";
import SideBar from "./side-bar";
import { Fab, useTheme, Zoom } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import MapIcon from "@material-ui/icons/MapRounded";
import Public from "@material-ui/icons/Public";

import { useAppStyles } from "./app-styles";
import MapOverlay2D from "../map-overlay-2D/map-overlay-2D";
import { useUiContext } from "../../hooks/use-ui-context";
import { MapOverlay3D } from "../map-overlay-3D/map-overlay-3D";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useScrollYObserverForTab } from "../../hooks/use-scroll-y-observer-for-tab";

function App() {
  const classes = useAppStyles();
  const {
    state: { canSwipe },
  } = useUiContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { isScrolledToBottom } = useScrollYObserverForTab(tabIndex);
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  function tab(icon, text, index) {
    return (
      <Tab
        classes={{
          wrapper: classes.tabContent,
        }}
        key={index}
        label={
          <>
            <Hidden>
              <Box component="div" className={classes.iconSpacing}>
                {icon}
              </Box>
            </Hidden>
            {text}
          </>
        }
      />
    );
  }

  const labels = [tab(<MapIcon />, "Map", 0), tab(<Public />, "3D", 1)];

  function handleChange(event, newValue) {
    setTabIndex(newValue);
  }

  function handleChangeIndex(index) {
    setTabIndex(index);
  }

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: sideBarOpen,
        })}
      >
        <ToolbarMenu
          tabIndex={tabIndex}
          toggle={setSideBarOpen}
          isOpen={sideBarOpen}
        />
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          classes={{ indicator: classes.indicator }}
        >
          {labels.map((tab) => tab)}
        </Tabs>
      </AppBar>
      <SwipeableViews
        className={clsx(classes.content, {
          [classes.contentShift]: sideBarOpen,
        })}
        index={tabIndex}
        style={Object.assign(
          { height: "100%", width: "100%" },
          tabIndex === 0 && { marginTop: "-48px", position: "fixed" }
        )}
        containerStyle={{ height: "100%", width: "100%" }}
        onChangeIndex={handleChangeIndex}
        disabled={!canSwipe}
        slideStyle={{ overflow: "hidden" }}
      >
        <MapOverlay2D />
        <MapOverlay3D />
      </SwipeableViews>
      <Zoom
        in={tabIndex === 1}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${tabIndex === 1 ? transitionDuration.exit : 0}ms`,
        }}
        unmountOnExit
      >
        <Fab
          aria-label="Scroll down"
          className={classes.fab}
          color="primary"
          onClick={() =>
            window.scroll({
              top: isScrolledToBottom ? 0 : document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          {isScrolledToBottom ? <UpIcon /> : <DownIcon />}
        </Fab>
      </Zoom>
      <SideBar isOpen={sideBarOpen} />
    </>
  );
}

export default App;
