import React, { useCallback, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import ToolbarMenu from "./toolbar-menu";
import SideBar from "../side-bar/side-bar";
import { useUiContext } from "../../hooks/use-ui-context";
import { setSidebarOpen } from "../../context/ui-actions";
import { Hidden, useMediaQuery, useTheme } from "@material-ui/core";
import TabBar from "../tab-bar/tab-bar";
import { useHeaderStyles } from "../shared/header-styles";

export function Header() {
  const classes = useHeaderStyles();
  const materialUiTheme = useTheme();

  const matches = useMediaQuery(materialUiTheme.breakpoints.down("xs"));
  const { sidebarOpen, dispatch } = useUiContext();
  const dispatchSidebarState = useCallback(
    function (args) {
      dispatch(setSidebarOpen(args));
    },
    [dispatch]
  );

  useEffect(() => {
    if (sidebarOpen && !matches) {
      dispatchSidebarState(false);
    }
  }, [sidebarOpen, matches, dispatchSidebarState]);

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        className={clsx(classes.navigation, {
          [classes.navigationShift]: sidebarOpen,
        })}
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
