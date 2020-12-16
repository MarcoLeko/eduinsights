import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./app.scss";
import SwipeableViews from "react-swipeable-views";
import clsx from "clsx";
import MapOverlay from "../donations-map/map-overlay";
import { connect } from "react-redux";
import ToggleableMenu from "./toggleable-menu";
import SideBar from "./side-bar";
import Statistics from "../statistics/statistics";
import { useScrollTrigger } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import MapIcon from "@material-ui/icons/MapRounded";
import Public from "@material-ui/icons/Public";

import { useAppStyles } from "./app-styles";

function App({ canSwipe }) {
  const classes = useAppStyles();
  const trigger = useScrollTrigger({ threshold: 48 });
  const [tabIndex, setTabIndex] = useState(0);
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
        className={clsx(
          classes.appBar,
          {
            [classes.appBarShift]: sideBarOpen,
          },
          "background"
        )}
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
        <MapOverlay />
        <Statistics />
      </SwipeableViews>
      <SideBar isOpen={sideBarOpen} />
    </>
  );
}

const mapStateToProps = (store) => ({
  canSwipe: store.uiReducer.canSwipe,
});

export default connect(mapStateToProps)(App);
