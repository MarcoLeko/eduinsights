import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./app.scss";
import SwipeableViews from "react-swipeable-views";
import clsx from "clsx";
import ToggleableMenu from "./toggleable-menu";
import SideBar from "./side-bar";
import { useScrollTrigger } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import MapIcon from "@material-ui/icons/MapRounded";
import Public from "@material-ui/icons/Public";

import { useAppStyles } from "./app-styles";
import MapOverlay2D from "../map-overlay-2D/map-overlay-2D";
import { useUiContext } from "../../hooks/use-ui-context";
import { MapOverlay3D } from "../map-overlay-3D/map-overlay-3D";

function App() {
  const classes = useAppStyles();
  const {
    state: { canSwipe },
  } = useUiContext();
  const trigger = useScrollTrigger({ threshold: 48 });
  const [tabIndex, setTabIndex] = useState(1);
  const [sideBarOpen, setSideBarOpen] = useState(false);

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

  function transitionY() {
    if (tabIndex === 0) {
      return 48;
    } else {
      if (!trigger) {
        return 0;
      } else {
        return 48;
      }
    }
  }

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: sideBarOpen,
        })}
        style={{
          transform: `translateY(-${transitionY()}px)`,
        }}
      >
        <ToggleableMenu
          trigger={trigger}
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
      <SideBar isOpen={sideBarOpen} />
    </>
  );
}

export default App;
