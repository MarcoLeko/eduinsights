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
import "./header.scss";

export function Header() {
  const materialUiTheme = useTheme();

  const isSmallViewport = useMediaQuery(materialUiTheme.breakpoints.down("xs"));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const { isSidebarOpen, dispatch } = useUiContext();
  const dispatchSidebarState = useCallback(
    function (args) {
      dispatch(setSidebarOpen(args));
    },
    [dispatch]
  );

  useEffect(() => {
    if (isSidebarOpen && !isSmallViewport) {
      dispatchSidebarState(false);
    }
  }, [isSidebarOpen, isSmallViewport, dispatchSidebarState]);

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        className={clsx(
          isSidebarOpen ? "navigation-shift" : "navigation",
          !trigger && !isSmallViewport && "header-not-scrolled"
        )}
      >
        <ToolbarMenu toggle={dispatchSidebarState} isOpen={isSidebarOpen} />
        <Hidden xsDown>
          <TabBar />
        </Hidden>
      </AppBar>
      <SideBar isOpen={isSidebarOpen} />
    </>
  );
}
