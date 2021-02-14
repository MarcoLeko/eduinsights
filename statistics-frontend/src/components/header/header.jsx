import React, { useCallback, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import ToolbarMenu from "./toolbar-menu";
import SideBar from "../side-bar/side-bar";
import { useUiContext } from "../../hooks/use-ui-context";
import { setSidebarOpen } from "../../context/ui-actions";
import {
  Hidden,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@material-ui/core";
import TabBar from "../tab-bar/tab-bar";
import { useHeaderStyles } from "../shared/header-styles";
import "./header.scss";

export function Header() {
  const classes = useHeaderStyles();
  const materialUiTheme = useTheme();

  const isSmallViewport = useMediaQuery(materialUiTheme.breakpoints.down("xs"));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const { sidebarOpen, dispatch } = useUiContext();
  const dispatchSidebarState = useCallback(
    function (args) {
      dispatch(setSidebarOpen(args));
    },
    [dispatch]
  );

  useEffect(() => {
    if (sidebarOpen && !isSmallViewport) {
      dispatchSidebarState(false);
    }
  }, [sidebarOpen, isSmallViewport, dispatchSidebarState]);

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        className={clsx(
          classes.navigation,
          !trigger && !isSmallViewport && "header-not-scrolled",
          {
            [classes.navigationShift]: sidebarOpen,
          }
        )}
      >
        <ToolbarMenu toggle={dispatchSidebarState} isOpen={sidebarOpen} />
        <Hidden xsDown>
          <TabBar />
        </Hidden>
      </AppBar>
      <SideBar isOpen={sidebarOpen} />
    </>
  );
}
