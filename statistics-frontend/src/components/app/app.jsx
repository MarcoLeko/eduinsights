import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import "./app.scss";
import clsx from "clsx";
import ToolbarMenu from "./toolbar-menu";
import SideBar from "./side-bar";
import { Container } from "@material-ui/core";

import { useAppStyles } from "./app-styles";
import Introduction from "../map-overlay-3D/introduction";
import { StatisticSelector } from "../statistic-selector/statistic-selector";
import { ScrollButtonHelper } from "./scroll-button-helper";

// TODO: condition when to show the scrollHelperButton, will change logic later
// TODO: integrate stepper from MUI: 1.Step choose statistic; 2.Step: choose visualization; 3.Step wait for visualization to be ready
// TODO: add animations for statistic selector like in here: https://react-swipeable-views.com/demos/demos/
// TODO: let toolbar be available in every route. Make route handling under toolbar.
// TODO: Make the stepper listen for query params '?statistic=foo&visualization=bar'
const condition = true;

function App() {
  const classes = useAppStyles();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: sideBarOpen,
        })}
      >
        <ToolbarMenu toggle={setSideBarOpen} isOpen={sideBarOpen} />
      </AppBar>
      <Container disableGutters>
        <Introduction />
        <StatisticSelector />
        <ScrollButtonHelper condition={condition} />
      </Container>
      <SideBar isOpen={sideBarOpen} />
    </>
  );
}

export default App;
