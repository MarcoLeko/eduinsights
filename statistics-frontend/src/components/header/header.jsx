import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import { useHeaderStyles } from "./header-styles";
import ToolbarMenu from "./toolbar-menu";
import SideBar from "./side-bar";

export function Header() {
  const classes = useHeaderStyles();
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
      <SideBar isOpen={sideBarOpen} />
    </>
  );
}
