import React from "react";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import { useHeaderStyles } from "./header-styles";
import ToolbarMenu from "./toolbar-menu";
import SideBar from "./side-bar";
import { useUiContext } from "../../hooks/use-ui-context";
import { setSidebarOpen } from "../../context/ui-actions";
import { Hidden } from "@material-ui/core";
import TabBar from "./tab-bar";

export function Header() {
  const classes = useHeaderStyles();
  const {
    state: { sidebarOpen },
    dispatch,
  } = useUiContext();

  function dispatchSidebarState(args) {
    dispatch(setSidebarOpen(args));
  }

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: sidebarOpen,
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
